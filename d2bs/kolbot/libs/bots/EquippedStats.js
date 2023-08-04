function EquippedStats() {
	if (typeof sdk === 'undefined') {
		const sdk = require('../libs/modules/sdk');
	}

	this.getAdjustedStat = function (given, configured) {
		if (given < 255) {
			return given;
		}
		return given - configured;
	};

	const stats = Config.EquippedStats.Stats;
	let i = 0, stat = 0, statDisplay = [];

	for (i = 0; i < stats.length; i++) {
		switch (stats[i]) {
			case "cb":
				statDisplay.push("ÿc4CB: ÿc0" + me.getStat(sdk.stats.Crushingblow));
				break;
			case "ds":
				statDisplay.push("ÿc4DS: ÿc0" + me.getStat(sdk.stats.Deadlystrike));
				break;
			case "fbr":
				statDisplay.push("ÿc4FBR: ÿc0" + this.getAdjustedStat(me.getStat(sdk.stats.Fasterblockrate), Config.FBR));
				break;
			case "fcr":
				statDisplay.push("ÿc4FCR: ÿc0" + this.getAdjustedStat(me.getStat(sdk.stats.Fastercastrate), Config.FCR));
				break;
			case "fhr":
				statDisplay.push("ÿc4FHR: ÿc0" + this.getAdjustedStat(me.getStat(sdk.stats.Fastergethitrate), Config.FHR));
				break;
			case "frw":
				statDisplay.push("ÿc4FRW: ÿc0" + me.getStat(sdk.stats.Fastermovevelocity));
				break;
			case "ias":
				statDisplay.push("ÿc4IAS: ÿc0" + this.getAdjustedStat(me.getStat(sdk.stats.Fasterattackrate), Config.IAS));
				break;
			case "ll":
				statDisplay.push("ÿc4LL: ÿc0" + me.getStat(sdk.stats.Lifedrainmindam));
				break;
			case "mf":
				statDisplay.push("ÿc4MF: ÿc0" + me.getStat(sdk.stats.Magicbonus));
				break;
			case "ow":
				statDisplay.push("ÿc4OW: ÿc0" + me.getStat(sdk.stats.Openwounds));
				break;
			case "tb":
				statDisplay.push("ÿc4TB: ÿc0" + me.getStat(sdk.stats.Toblock));
				break;
		}
	}

	print(statDisplay.join("\n"));
	return true;
}
