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
		missing: function () {
			const merc = me.getMerc();
			const hasTreachery = Equip.hasRunewordEquippedAt(merc, sdk.body.Armor, 'Treachery');
			return !hasTreachery;
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
			Config.Runewords.push([Runeword.Treachery, 'archonplate', Roll.Eth]);
			Config.Runewords.push([Runeword.Treachery, 'duskshroud', Roll.Eth]);
			Config.Runewords.push([Runeword.Treachery, 'greathauberk', Roll.Eth]);
			Config.KeepRunewords.push('[type] == armor && [class] == elite && [flag] == runeword && [flag] == ethereal # [assassinskills] == 2 && [ias] == 45 && [fhr] == 20');
			return true;
		}
	};
})(module);
