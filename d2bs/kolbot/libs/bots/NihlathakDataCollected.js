/**
*  @filename    Nihlathak.js
*  @author      kolton, theBGuy
*  @desc        kill Nihlathak
*
*/


// class
// level
// skill tree dump (if possible)
// fcr
// teleport time
// kill time
// viper quit
// nihlathak is cold immune

function Nihlathak() {
	Town.doChores();

	const fnDoTimed = function(fnTimed) {
		let e = null;
		let result = null;
		const start = getTickCount();
		try {
			result = fnTimed();
		} catch (ce) {
			e = ce;
		} finally {
			const end = getTickCount();
			return {
				timeInMS: end - start,
				result: result,
				exception: e
			};
		}
	};
	const fnRecordData = function(data) {
		const logName = 'logs/nihlathak-data.csv';
		const dataString = JSON.stringify(data);
		FileTools.appendText(logName, dataString + "\n");
	};

	const recordedData = {
		timestamp: (new Date()).toISOString(),
		name: me.name,
		class: sdk.player.class.nameOf(me.classid),
		level: me.charlvl,
		fcr: me.getStat(sdk.stats.FCR),
		teleportTime: null,
		killTime: null,
		viperQuit: false,
		coldImmune: false
	};

	let { timeInMS, result, exception } = fnDoTimed(
		function() {
			// UseWaypoint if set to or if we already have it
			if (Config.Nihlathak.UseWaypoint || getWaypoint(Pather.wpAreas.indexOf(sdk.areas.HallsofPain))) {
				Pather.useWaypoint(sdk.areas.HallsofPain);
			} else {
				Pather.journeyTo(sdk.areas.NihlathaksTemple) && Pather.moveToExit([sdk.areas.HallsofAnguish, sdk.areas.HallsofPain], true);
			}
			Precast.doPrecast(false);

			if (!Pather.moveToExit(sdk.areas.HallsofVaught, true)) throw new Error("Failed to go to Nihlathak");

			Pather.moveToPreset(me.area, sdk.unittype.Object, sdk.objects.NihlathaksPlatform, 0, 0, false, true);
		}
	);
	if (exception) {
		throw exception;
	}
	recordedData.teleportTime = timeInMS;

	if (Config.Nihlathak.ViperQuit && Game.getMonster(sdk.monsters.TombViper2)) {
		recordedData.viperQuit = true;
		fnRecordData(recordedData);
		print("Tomb Vipers found.");

		return true;
	}

	recordedData.coldImmune = Attack.checkResist(sdk.monsters.Nihlathak, "Cold");
	({timeInMS, result, exception} = fnDoTimed(
		function() {
			return Attack.kill(sdk.monsters.Nihlathak);
		}
	));
	if (exception) {
		throw exception;
	}
	if (result) {
		recordedData.killTime = timeInMS;
	}
	fnRecordData(recordedData);
	Pickit.pickItems();

	return true;
}
