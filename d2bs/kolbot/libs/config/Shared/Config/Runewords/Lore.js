js_strict(true);

if (typeof sdk === 'undefined') {
	var sdk = require('../../../../modules/sdk');
}
if (!isIncluded('common/Equip.js')) {
	include('common/Equip.js');
}


(function (module) {
	module.exports = {
		Name: 'Lore',
		Missing: function () {
			const merc = me.getMerc();
			const hasLore = Equip.hasRunewordEquippedAt(merc, sdk.body.Head, 'Lore');
			return !hasLore;
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

			Config.Recipes.push([Recipe.Socket.Weapon, 'cap', Roll.NonEth]);
			Config.Recipes.push([Recipe.Socket.Weapon, 'skullcap', Roll.NonEth]);
			Config.Recipes.push([Recipe.Socket.Weapon, 'mask', Roll.NonEth]);
			Config.KeepRunewords.push('[type] == helm && [class] == noraml && [flag] == runeword && [flag] != ethereal # [itemallskills] == 1');
			return true;
		}
	};
})(module);
