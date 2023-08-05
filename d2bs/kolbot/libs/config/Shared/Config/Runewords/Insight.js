js_strict(true);

if (typeof sdk === 'undefined') {
	var sdk = require('../../../../modules/sdk');
}
if (!isIncluded('common/Equip.js')) {
	include('common/Equip.js');
}


(function () {
	return {
		RollAndKeep: function () {
			const merc = me.getMerc();
			const hasInsight = Equip.hasRunewordEquippedAt(merc, sdk.body.LeftArm, "Insight");

			// Any Insight is better than no Insight
			if (!hasInsight) {
				Config.Recipes.push([Recipe.Socket.Weapon, "polearm", Roll.All]);
				Config.KeepRunewords.push("[type] == polearm && [flag] == runeword # [meditationaura] >= 12");
				return true;
			}

			// Only do upgrades
			const mercWeapon = Equip.equippedAt(merc, sdk.body.LeftArm);
			const hasEliteInsight = mercWeapon.itemclass === sdk.class.Elite,
				hasEtherealInsight = mercWeapon.getFlag(sdk.items.flags.Ethereal)
			;

			if (hasEliteInsight && hasEtherealInsight) {
				return false;
			}
			Config.Recipes.push([Recipe.Socket.Weapon, "giantthresher", Roll.All]);
			Config.Recipes.push([Recipe.Socket.Weapon, "greatpoleaxe", Roll.All]);
			Config.Recipes.push([Recipe.Socket.Weapon, "thresher", Roll.All]);
			Config.KeepRunewords.push("[type] == polearm && [class] == elite && [flag] == runeword && [flag] == ethereal # [meditationaura] >= 12");
			return true;
		}
	};
})();
