js_strict(true);

if (typeof sdk === 'undefined') {
	var sdk = require('../../../../modules/sdk');
}
if (!isIncluded('common/Equip.js')) {
	include('common/Equip.js');
}


(function (module) {
	module.exports = {
		BodyLocs: [
			sdk.body.LeftArm,
			sdk.body.RightArm
		],
		Name: 'Spirit Monarch',
		Missing: function () {
			let found = false;
			this.BodyLocs.forEach((loc) => {
				found ||= Equip.hasRunewordEquippedAt(me, loc, 'Spirit');
			});
			return found;
		},
		ShouldUpgrade: function () {
			if (this.Missing()) {
				return true;
			}

			const minFCR = this.GetMinFCR();
			return minFCR !== null && minFCR < 35;
		},
		MissingOrShouldUpgrade: function () {
			return this.Missing() || this.ShouldUpgrade();
		},
		RollAndKeep: function () {
			const missing = this.Missing(),
				upgrade = this.ShouldUpgrade()
			;
			if (!missing && !upgrade) {
				return false;
			}
			if (missing) {
				Config.Recipes.push([Recipe.Socket.Weapon, 'broadsword', Roll.NonEth]);
				Config.Recipes.push([Recipe.Socket.Weapon, 'crystalsword', Roll.NonEth]);
				Config.KeepRunewords.push('[type] == sword && [class] == normal && [flag] == runeword # [itemallskills] == 2 && [fcr] >= 25');
				return true;
			}

			const minFCR = this.GetMinFCR();
			if (minFCR === null) {
				return false;
			}

			Config.Recipes.push([Recipe.Socket.Weapon, 'broadsword', Roll.NonEth]);
			Config.Recipes.push([Recipe.Socket.Weapon, 'crystalsword', Roll.NonEth]);
			Config.KeepRunewords.push('[type] == sword && [class] == normal && [flag] == runeword # [itemallskills] == 2 && [fcr] > ' + minFCR);
			return true;
		},
		GetMinFCR: function () {
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
				if (item.getStatEx(sdk.stats.FCR) >= 35) {
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
