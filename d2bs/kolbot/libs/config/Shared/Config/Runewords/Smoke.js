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
		missing: function () {
			const merc = me.getMerc();
			const hasSmoke = Equip.hasRunewordEquippedAt(merc, sdk.body.Armor, 'Smoke');
			return !hasSmoke;
		},
		shouldUpgrade: function () {
			return this.missing();
		},
		missingOrShouldUpgrade: function () {
			return this.missing() || this.shouldUpgrade();
		},
		rollAndKeep: function () {
			Config.Recipes.push([Recipe.Socket.Weapon, 'quiltedarmor', Roll.NonEth]);
			Config.Recipes.push([Recipe.Socket.Weapon, 'leatherarmor', Roll.NonEth]);
			Config.Recipes.push([Recipe.Socket.Weapon, 'hardleatherarmor', Roll.NonEth]);
			Config.Recipes.push([Recipe.Socket.Weapon, 'studdedleather', Roll.NonEth]);
			Config.Recipes.push([Recipe.Socket.Weapon, 'breastplate', Roll.NonEth]);
			Config.Recipes.push([Recipe.Socket.Weapon, 'lightplate', Roll.NonEth]);
			Config.Runewords.push([Runeword.Smoke, 'quiltedarmor', Roll.NonEth]);
			Config.Runewords.push([Runeword.Smoke, 'leatherarmor', Roll.NonEth]);
			Config.Runewords.push([Runeword.Smoke, 'hardleatherarmor', Roll.NonEth]);
			Config.Runewords.push([Runeword.Smoke, 'studdedleather', Roll.NonEth]);
			Config.Runewords.push([Runeword.Smoke, 'breastplate', Roll.NonEth]);
			Config.Runewords.push([Runeword.Smoke, 'lightplate', Roll.NonEth]);
			Config.KeepRunewords.push('[type] == armor && [class] == noraml && [flag] == runeword && [flag] != ethereal # [coldresist] == 50 && [fireresist] == 50 && [lightresist] == 50 && [fhr] == 20');
		}
	};
})(module);
