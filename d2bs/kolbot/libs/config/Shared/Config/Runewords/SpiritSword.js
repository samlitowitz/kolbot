js_strict(true);

if (typeof sdk === 'undefined') {
	var sdk = require('../../../../modules/sdk');
}
if (!isIncluded('common/Equip.js')) {
	include('common/Equip.js');
}


(function () {
	const hasSpiritLeft = Equip.hasRunewordEquippedAt(me, sdk.body.LeftArm, "Spirit");
	const hasSpiritRight = Equip.hasRunewordEquippedAt(me, sdk.body.RightArm, "Spirit");
	const hasSpirit = hasSpiritLeft || hasSpiritRight;

	// Any Spirit is better than no Spirit
	if (!hasSpirit) {
		Config.Recipes.push([Recipe.Socket.Weapon, "broadsword", Roll.NonEth]);
		Config.Recipes.push([Recipe.Socket.Weapon, "crystalsword", Roll.NonEth]);
		Config.KeepRunewords.push("[type] == sword && [class] == normal && [flag] == runeword # [itemallskills] == 2 && [fcr] >= 25");
		return;
	}

	let leftFCR = null;
	if (hasSpiritLeft) {
		const leftEquip = Equip.equippedAt(me, sdk.body.LeftArm);
		if (leftEquip.itemtype === sdk.items.type.Sword) {
			leftFCR = leftEquip.getStatEx(sdk.stats.FCR);
		}

	}
	let rightFCR = null;
	if (hasSpiritRight) {
		const rightEquip = Equip.equippedAt(me, sdk.body.RightArm);
		if (rightEquip.itemtype === sdk.items.type.Sword) {
			rightFCR = rightEquip.getStatEx(sdk.stats.FCR);
		}
	}

	let minFCR = 25;
	switch (true) {
		case leftFCR === null && rightFCR !== null && rightFCR < 35:
			minFCR = rightFCR;
			break;

		case rightFCR === null && leftFCR !== null && leftFCR < 35:
			minFCR = leftFCR;
			break;

		case leftFCR !== null && leftFCR < 35 && rightFCR !== null && rightFCR < 35:
			minFCR = leftFCR > rightFCR ? rightFCR : leftFCR;
			break;

		case leftFCR === 35 && rightFCR === 35:
			return;

		case leftFCR === null && rightFCR === null:
		default:
	}

	Config.Recipes.push([Recipe.Socket.Weapon, "broadsword", Roll.NonEth]);
	Config.Recipes.push([Recipe.Socket.Weapon, "crystalsword", Roll.NonEth]);
	Config.KeepRunewords.push("[type] == sword && [class] == normal && [flag] == runeword # [itemallskills] == 2 && [fcr] > " + minFCR);
})();
