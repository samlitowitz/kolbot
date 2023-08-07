js_strict(true);

if (typeof sdk === 'undefined') {
	var sdk = require('../../../../modules/sdk');
}
if (!isIncluded('common/Equip.js')) {
	include('common/Equip.js');
}


(function (module) {
	module.exports = {
		Name: 'Smoke',
		Missing: function () {
			const merc = me.getMerc();
			const hasSmoke = Equip.hasRunewordEquippedAt(merc, sdk.body.Armor, 'Smoke');
			return !hasSmoke;
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

			Config.Recipes.push([Recipe.Socket.Weapon, 'quiltedarmor', Roll.NonEth]);
			Config.Recipes.push([Recipe.Socket.Weapon, 'leatherarmor', Roll.NonEth]);
			Config.Recipes.push([Recipe.Socket.Weapon, 'hardleatherarmor', Roll.NonEth]);
			Config.Recipes.push([Recipe.Socket.Weapon, 'studdedleather', Roll.NonEth]);
			Config.Recipes.push([Recipe.Socket.Weapon, 'breastplate', Roll.NonEth]);
			Config.Recipes.push([Recipe.Socket.Weapon, 'lightplate', Roll.NonEth]);
			Config.KeepRunewords.push('[type] == armor && [class] == noraml && [flag] == runeword && [flag] != ethereal # [coldresist] == 50 && [fireresist] == 50 && [lightresist] == 50 && [fhr] == 20');
			return true;
		}
	};
})(module);
