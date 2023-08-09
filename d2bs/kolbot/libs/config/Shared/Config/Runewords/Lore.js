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
		missing: function () {
			const merc = me.getMerc();
			const hasLore = Equip.hasRunewordEquippedAt(merc, sdk.body.Head, 'Lore');
			return !hasLore;
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

			Config.Recipes.push([Recipe.Socket.Weapon, 'cap', Roll.NonEth]);
			Config.Recipes.push([Recipe.Socket.Weapon, 'skullcap', Roll.NonEth]);
			Config.Recipes.push([Recipe.Socket.Weapon, 'mask', Roll.NonEth]);
			Config.KeepRunewords.push('[type] == helm && [class] == noraml && [flag] == runeword && [flag] != ethereal # [itemallskills] == 1');
			return true;
		}
	};
})(module);
