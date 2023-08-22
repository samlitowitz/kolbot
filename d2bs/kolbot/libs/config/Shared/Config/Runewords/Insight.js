js_strict(true);

if (typeof sdk === 'undefined') {
	var sdk = require('../../../../modules/sdk');
}
if (!isIncluded('common/Equip.js')) {
	include('common/Equip.js');
}


(function (module) {
	module.exports = {
		missing: function () {
			const merc = me.getMerc();
			const hasInsight = Equip.hasRunewordEquippedAt(merc, sdk.body.LeftArm, 'Insight');
			return !hasInsight;
		},
		shouldUpgrade: function () {
			if (this.missing()) {
				return true;
			}
			const merc = me.getMerc();
			const mercWeapon = Equip.equippedAt(merc, sdk.body.LeftArm);
			const hasEliteInsight = mercWeapon.itemclass === sdk.class.Elite,
				hasEtherealInsight = mercWeapon.getFlag(sdk.items.flags.Ethereal)
			;

			return !hasEliteInsight || !hasEtherealInsight;
		},
		missingOrShouldUpgrade: function () {
			return this.missing() || this.shouldUpgrade();
		},
		rollAndKeep: function () {
			Config.Recipes.push([Recipe.Socket.Weapon, 'giantthresher', Roll.All]);
			Config.Recipes.push([Recipe.Socket.Weapon, 'greatpoleaxe', Roll.All]);
			Config.Recipes.push([Recipe.Socket.Weapon, 'thresher', Roll.All]);
			Config.Runewords.push([Runeword.Insight, 'giantthresher', Roll.All]);
			Config.Runewords.push([Runeword.Insight, 'greatpoleaxe', Roll.All]);
			Config.Runewords.push([Runeword.Insight, 'thresher', Roll.All]);
			Config.KeepRunewords.push('[type] == polearm && [class] == elite && [flag] == runeword && [flag] == ethereal # [meditationaura] >= 12');
		}
	};
})(module);
