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
		Missing: function () {
			const merc = me.getMerc();
			const hasFortitude = Equip.hasRunewordEquippedAt(merc, sdk.body.Armor, 'Fortitude');
			return !hasFortitude;
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

			Config.Recipes.push([Recipe.Socket.Weapon, 'archonplate', Roll.Eth]);
			Config.Recipes.push([Recipe.Socket.Weapon, 'duskshroud', Roll.Eth]);
			Config.Recipes.push([Recipe.Socket.Weapon, 'greathauberk', Roll.Eth]);
			Config.KeepRunewords.push('[type] == armor && [class] == elite && [flag] == runeword && [flag] == ethereal # [enhanceddamage] == 300 && [enhanceddefense] == 200 && [maxlightresist] == 5');
			return true;
		}
	};
})(module);
