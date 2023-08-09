js_strict(true);

if (typeof sdk === 'undefined') {
	var sdk = require('../../../../modules/sdk');
}
if (!isIncluded('common/Equip.js')) {
	include('common/Equip.js');
}


(function (module) {
	module.exports = {
		BodyLocs: [
			sdk.body.LeftArm,
			sdk.body.RightArm
		],
		Name: 'Tal Rasha\'s Lidless Eye',
		farmScripts: function () {
			return [
				'Mephisto',
				'Andariel'
			];
		},
		missing: function () {
			let i, loc;
			for (i = 0; i < this.BodyLocs.length; i++) {
				loc = this.BodyLocs[i];
				if (!Equip.hasSetEquippedAt(me, loc, this.Name)) {
					continue;
				}
				return true;
			}
			return false;
		},
		shouldUpgrade: function () {
			if (this.missing()) {
				return true;
			}
			return false;
		},
		missingOrShouldUpgrade: function () {
			return this.missing() || this.shouldUpgrade();
		},
		rollAndKeep: function () {
			if (!this.missingOrShouldUpgrade()) {
				return false;
			}
			const coldMastery = this.getMaxColdMastery(),
				lightningMastery = this.getMaxLightningMastery()
			;
			if (coldMastery === null) {
				return false;
			}
			if (lightningMastery === null) {
				return false;
			}
			Config.KeepRunewords.push(
				"[name] == swirlingcrystal && [quality] == set # [skillcoldmastery] > {1} && [skilllightningmastery] > {2}".format(coldMastery, lightningMastery)
			);
			return true;
		},
		getMaxColdMastery: function () {
			const [id, subid] = sdk.stats.SkillColdMastery;
			let i, maxColdMastery = null, loc, item;
			for (i = 0; i < this.BodyLocs.length; i++) {
				loc = this.BodyLocs[i];
				if (!Equip.hasSetEquippedAt(me, loc, this.Name)) {
					continue;
				}
				item = Equip.equippedAt(loc);
				if (item === null) {
					continue;
				}
				if (item.itemType !== sdk.items.type.Weapon) {
					continue;
				}
				if (maxColdMastery === null) {
					maxColdMastery = item.getStatEx(id, subid);
					continue;
				}
				if (item.getStatEx(id, subid) < maxColdMastery) {
					continue;
				}
				maxColdMastery = item.getStatEx(id, subid);
			}
			return maxColdMastery;
		},
		getMaxLightningMastery: function () {
			const [id, subid] = sdk.stats.SkillLightningMastery;
			let i, maxLightningMastery = null, loc, item;
			for (i = 0; i < this.BodyLocs.length; i++) {
				loc = this.BodyLocs[i];
				if (!Equip.hasSetEquippedAt(me, loc, this.Name)) {
					continue;
				}
				item = Equip.equippedAt(loc);
				if (item === null) {
					continue;
				}
				if (item.itemType !== sdk.items.type.Weapon) {
					continue;
				}
				if (maxLightningMastery === null) {
					maxLightningMastery = item.getStatEx(id, subid);
					continue;
				}
				if (item.getStatEx(id, subid) < maxLightningMastery) {
					continue;
				}
				maxLightningMastery = item.getStatEx(id, subid);
			}
			return maxLightningMastery;
		}
	}
})(module);
