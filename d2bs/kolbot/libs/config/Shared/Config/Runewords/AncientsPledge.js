js_strict(true);

if (typeof sdk === 'undefined') {
	var sdk = require('../../../../modules/sdk');
}
if (!isIncluded('common/Equip.js')) {
	include('common/Equip.js');
}


(function (module) {
	module.exports = {
		MissingOrShouldUpgrade: function () {
			const hasAncientsPledgeLeft = Equip.hasRunewordEquippedAt(me, sdk.body.LeftArm, "Ancients Pledge");
			const hasAncientsPledgeRight = Equip.hasRunewordEquippedAt(me, sdk.body.RightArm, "Ancients Pledge");
			const hasAncientsPledge = hasAncientsPledgeLeft || hasAncientsPledgeRight;
			return !hasAncientsPledge;
		},
		RollAndKeep: function () {
			const hasAncientsPledgeLeft = Equip.hasRunewordEquippedAt(me, sdk.body.LeftArm, "Ancients Pledge");
			const hasAncientsPledgeRight = Equip.hasRunewordEquippedAt(me, sdk.body.RightArm, "Ancients Pledge");
			const hasAncientsPledge = hasAncientsPledgeLeft || hasAncientsPledgeRight;

			if (hasAncientsPledge) {
				return false;
			}
			Config.Recipes.push([Recipe.Socket.Weapon, "kiteshield", Roll.NonEth]);
			Config.Recipes.push([Recipe.Socket.Weapon, "largeshield", Roll.NonEth]);
			Config.KeepRunewords.push("[type] == shield && [class] == normal && [flag] == runeword # [coldresist] == 43 && [fireresist] == 48 && [lightresist] == 48");
		}
	}
})(module);
