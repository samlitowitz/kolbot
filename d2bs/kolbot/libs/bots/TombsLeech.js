/**
*	@filename	TristramLeech.js
*	@author		ToS/XxXGoD/YGM
*	@desc		Tristram Leech (Helper)
*/

function TombsLeech() {
	const debug = false;
	var leaderName, i;
	const tombs = [66, 67, 68, 69, 70, 71, 72];

	this.debugPrint(msg) {
		if (!debug) {
			return;
		}
		print("TombsLeech: " + msg);
	}

	// Get leader's Unit
	this.getLeaderUnit = function (leaderName) {
		var player = getUnit(0, leaderName);
		if (player) {
			do {
				if (player.mode !== 0 && player.mode !== 17) {
					return player;
				}
			} while (player.getNext());
		}

		return false;
	};

	Town.doChores();
	Pather.useWaypoint(40); // Back To Lut Gholein
	Town.move("portalspot"); // Portal Spot

	leaderName = Config.Leader;

	// Check leader isn't in other zones, whilst waiting for portal.
	this.takeLeaderPortal = function (leaderName, tombs) {
		var leaderParty;
		for (i = 0; i < Config.TombsLeech.Wait; i += 1) {
			leaderParty = getParty(leaderName);
			if (
				tombs.includes(leaderParty.area)
				&& Pather.usePortal(leaderParty.area, leaderName)
			) {
				break;
			}

			delay(1000);
			say("portal");
		}

		if (i === Config.TombsLeech.Wait) {
			throw new Error("No portal found to Tombs.");
		}
	};

	let leaderUnit, leaderInTomb, meInTomb;
	big_loop:
	while (true) {
		leaderUnit = getParty(leaderName);
		if (!leaderUnit) {
			this.debugPrint("Leader Not Found: " + leaderName);
			delay(500);
			continue big_loop;
		}
		leaderInTomb = tombs.includes(leaderUnit.area);
		meInTomb = tombs.includes(me.area);
		diffArea = leaderUnit.area !== me.area;



		switch (true) {
			// Leader is not in tomb -> wait at a2 portal spot
			case !leaderInTomb:
				this.debugPrint("Leader Not In Tomb: " + leaderUnit.area);
				if (!Pather.journeyTo(40)) {
					throw new Error("failed to move to lut gholein");
				}
				Town.move("portalspot");
				delay(500);
				continue big_loop;

			// Leader is in tomb, I am not in tomb -> wait for leader portal
			case leaderInTomb && !meInTomb:
				this.debugPrint("Leader in tomb, I am not: " + me.area);
				this.takeLeaderPortal(leaderName, tombs);
				Precast.doPrecast(true);
				delay(500);
				continue big_loop;

			// Leader is in tomb, I am in a different tomb -> go to a2, wait for leader portal
			case leaderInTomb && meInTomb && diffArea:
				this.debugPrint("Leader in different tomb: " + me.area);
				Town.goToTown();
				if (me.area !== 40 && !Pather.journeyTo(40)) {
					throw new Error("failed to move to lut gholein");
				}
				Town.move("portalspot");
				delay(500);
				continue big_loop;

			// Leader is in tomb, I am in same tomb -> follow leader
			case leaderInTomb && meInTomb && !diffArea:
				this.debugPrint("follow the leader");
				try {
					if (copyUnit(leaderUnit).x) {
						if (getDistance(me, leaderUnit) > 20) {
							Pather.moveToUnit(leaderUnit);
							Attack.clear(10);
						}
					} else {
						Pather.moveTo(copyUnit(leaderUnit).x, copyUnit(leaderUnit).y);
						Attack.clear(10);
					}
				}
				catch (err) {
					if (leaderUnit.area === me.area) {
						Pather.moveTo(leaderUnit.x, leaderUnit.y);
						Attack.clear(10);
					}
				}
				delay(100);
		}
	}

	return true;
}

