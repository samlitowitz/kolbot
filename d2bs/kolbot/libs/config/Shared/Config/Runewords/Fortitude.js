js_strict(true);

if (typeof sdk === 'undefined') {
	var sdk = require('../../../../modules/sdk');
}
if (!isIncluded('common/Equip.js')) {
	include('common/Equip.js');
}


(function (module) {
	module.exports = {
		Name: 'Fortitude',
		missing: function () {
			const merc = me.getMerc();
			const hasFortitude = Equip.hasRunewordEquippedAt(merc, sdk.body.Armor, 'Fortitude');
			return !hasFortitude;
		},
		shouldUpgrade: function () {
			return this.missing();
		},
		missingOrShouldUpgrade: function () {
			return this.missing() || this.shouldUpgrade();
		},
		rollAndKeep: function () {
			Config.Recipes.push([Recipe.Socket.Weapon, 'archonplate', Roll.Eth]);
			Config.Recipes.push([Recipe.Socket.Weapon, 'duskshroud', Roll.Eth]);
			Config.Recipes.push([Recipe.Socket.Weapon, 'greathauberk', Roll.Eth]);
			Config.Runewords.push([Runeword.Fortitude, 'archonplate', Roll.Eth]);
			Config.Runewords.push([Runeword.Fortitude, 'duskshroud', Roll.Eth]);
			Config.Runewords.push([Runeword.Fortitude, 'greathauberk', Roll.Eth]);
			Config.KeepRunewords.push('[type] == armor && [class] == elite && [flag] == runeword && [flag] == ethereal # [enhanceddamage] == 300 && [enhanceddefense] == 200 && [maxlightresist] == 5');
		}
	};
})(module);
