js_strict(true);

if (typeof sdk === 'undefined') {
	var sdk = require('../../../../modules/sdk');
}
if (!isIncluded('common/Equip.js')) {
	include('common/Equip.js');
}


(function (module) {
	// TODO: Export the following functions instead...
	// TODO: `pickIt` function to check conditions and push Config.Recipes and Config.KeepRunewords
	// TODO:
	module.exports = {
		BodyLocs: [
			sdk.body.LeftArm,
			sdk.body.RightArm
		],
		Name: 'Spirit Monarch',
		missing: function () {
			const minFCR = this.getMinFCR();
			return minFCR === null;
		},
		shouldUpgrade: function () {
			if (this.missing()) {
				return true;
			}

			const minFCR = this.getMinFCR();
			return minFCR !== null && minFCR < 35;
		},
		missingOrShouldUpgrade: function () {
			return this.missing() || this.shouldUpgrade();
		},
		rollAndKeep: function () {
			let minFCR = this.getMinFCR();
			if (minFCR === null) {
				minFCR = 25;
			}

			Config.Recipes.push([Recipe.Socket.Weapon, 'monarch', Roll.NonEth]);
			Config.Runewords.push([Runeword.Spirit, 'monarch', Roll.NonEth]);
			Config.KeepRunewords.push('[type] == shield && [class] == normal && [flag] == runeword # [itemallskills] == 2 && [fcr] > ' + minFCR);
		},
		getMinFCR: function () {
			let i, minFCR = null, loc, item;
			for (i = 0; i < this.BodyLocs.length; i++) {
				loc = this.BodyLocs[i];
				if (!Equip.hasRunewordEquippedAt(me, loc, 'Spirit')) {
					continue;
				}
				item = Equip.equippedAt(loc);
				if (item === null) {
					continue;
				}
				if (item.itemType !== sdk.items.type.Shield) {
					continue;
				}
				if (minFCR === null) {
					minFCR = item.getStatEx(sdk.stats.FCR);
					continue;
				}
				if (item.getStatEx(sdk.stats.FCR) > minFCR) {
					continue;
				}
				minFCR = item.getStatEx(sdk.stats.FCR);
			}
			return minFCR;
		}
	};
})(module);
