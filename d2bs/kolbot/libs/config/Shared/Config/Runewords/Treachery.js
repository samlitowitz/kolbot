js_strict(true);

if (typeof sdk === 'undefined') {
	var sdk = require('../../../../modules/sdk');
}
if (!isIncluded('common/Equip.js')) {
	include('common/Equip.js');
}


(function (module) {
	module.exports = {
		Name: 'Treachery',
		Missing: function () {
			const merc = me.getMerc();
			const hasTreachery = Equip.hasRunewordEquippedAt(merc, sdk.body.Armor, 'Treachery');
			return !hasTreachery;
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
			Config.KeepRunewords.push('[type] == armor && [class] == elite && [flag] == runeword && [flag] == ethereal # [assassinskills] == 2 && [ias] == 45 && [fhr] == 20');
			return true;
		}
	};
})(module);
