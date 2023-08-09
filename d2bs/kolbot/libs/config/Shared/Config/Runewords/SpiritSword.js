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
		Name: 'Spirit Sword',
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
			const missing = this.missing(),
				upgrade = this.shouldUpgrade()
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

			const minFCR = this.getMinFCR();
			if (minFCR === null) {
				return false;
			}

			Config.Recipes.push([Recipe.Socket.Weapon, 'broadsword', Roll.NonEth]);
			Config.Recipes.push([Recipe.Socket.Weapon, 'crystalsword', Roll.NonEth]);
			Config.KeepRunewords.push('[type] == sword && [class] == normal && [flag] == runeword # [itemallskills] == 2 && [fcr] > ' + minFCR);
			return true;
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
				if (item.itemType !== sdk.items.type.Sword) {
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
