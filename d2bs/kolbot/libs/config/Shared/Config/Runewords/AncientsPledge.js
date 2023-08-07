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
		Name: 'Ancients Pledge',
		Missing: function () {
			let found = false;
			this.BodyLocs.forEach((loc) => {
				found ||= Equip.hasRunewordEquippedAt(me, loc, 'Ancients Pledge');
			});
			return found;
		},
		ShouldUpgrade: function () {
			return this.Missing();
		},
		MissingOrShouldUpgrade: function () {
			return this.Missing() || this.ShouldUpgrade();
		},
		RollAndKeep: function () {
			if (!this.MissingOrShouldUpgrade()) {
				return false;
			}
			Config.Recipes.push([Recipe.Socket.Weapon, "kiteshield", Roll.NonEth]);
			Config.Recipes.push([Recipe.Socket.Weapon, "largeshield", Roll.NonEth]);
			Config.KeepRunewords.push("[type] == shield && [class] == normal && [flag] == runeword # [coldresist] == 43 && [fireresist] == 48 && [lightresist] == 48");
		}
	}
})(module);
