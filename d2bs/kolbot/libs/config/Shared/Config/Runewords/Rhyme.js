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
		Name: 'Rhyme',
		missing: function () {
			let i, loc;
			for (i = 0; i < this.BodyLocs.length; i++) {
				loc = this.BodyLocs[i];
				if (!Equip.hasRunewordEquippedAt(me, loc, 'Rhyme')) {
					continue;
				}
				return true;
			}
			return false;
		},
		shouldUpgrade: function () {
			return this.missing();
		},
		missingOrShouldUpgrade: function () {
			return this.missing() || this.shouldUpgrade();
		},
		rollAndKeep: function () {
			if (!this.missingOrShouldUpgrade()) {
				return false;
			}
			Config.Recipes.push([Recipe.Socket.Weapon, "kiteshield", Roll.NonEth]);
			Config.Recipes.push([Recipe.Socket.Weapon, "largeshield", Roll.NonEth]);
			Config.Recipes.push([Recipe.Socket.Weapon, "smallshield", Roll.NonEth]);
			Config.KeepRunewords.push("[type] == shield && [class] == normal && [flag] == runeword # [itemcannotbefrozen] > 0 && [coldresist] == 25 && [fireresist] == 25 && [lightresist] == 25");
			return true;
		}
	}
})(module);
