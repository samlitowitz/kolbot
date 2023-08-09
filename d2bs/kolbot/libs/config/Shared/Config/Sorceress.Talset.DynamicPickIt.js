if (typeof AncientsPledge === 'undefined') {
	var AncientsPledge = require('Runewords/AncientsPledge');
}
if (typeof Fortitude === 'undefined') {
	var Fortitude = require('Runewords/Fortitude');
}
if (typeof RWInfinity === 'undefined') {
	var RWInfinity = require('Runewords/Infinity');
}
if (typeof Insight === 'undefined') {
	var Insight = require('Runewords/Insight');
}
if (typeof Rhyme === 'undefined') {
	var Rhyme = require('Runewords/Rhyme');
}
if (typeof SpiritSword === 'undefined') {
	var SpiritSword = require('Runewords/SpiritSword');
}
if (typeof SpiritMonarch === 'undefined') {
	var SpiritMonarch = require('Runewords/SpiritMonarch');
}
if (typeof Treachery === 'undefined') {
	var Treachery = require('Runewords/Treachery');
}

if (typeof Vipermagi === 'undefined') {
	var Vipermagi = require('Uniques/Vipermagi');
}

if (typeof TalAmulet === 'undefined') {
	var TalAmulet = require('Sets/TalAmulet');
}
if (typeof TalArmor === 'undefined') {
	var TalArmor = require('Sets/TalArmor');
}
if (typeof TalBelt === 'undefined') {
	var TalBelt = require('Sets/TalBelt');
}
if (typeof TalHelm === 'undefined') {
	var TalHelm = require('Sets/TalHelm');
}
if (typeof TalWeapon === 'undefined') {
	var TalWeapon = require('Sets/TalWeapon');
}

const MercArmor = [
	Fortitude,
	Treachery
];

const MercWeapons = [
	Insight
];

const Armors = [
	TalArmor,
	Vipermagi
];

const Heads = [
	TalHelm
];

const Necks = [
	TalAmulet
];

const Shields = [
	SpiritMonarch,
	Rhyme,
	AncientsPledge
];

const Weapons = [
	TalWeapon,
	SpiritSword
];

// TODO: How to integrate FarmScripts
// TODO: Build auto-equip

(function () {
	fnPrioritizedRollAndKeep(MercArmor);
	fnPrioritizedRollAndKeep(MercWeapons);
	fnPrioritizedRollAndKeep(Armors);
	fnPrioritizedRollAndKeep(Heads);
	fnPrioritizedRollAndKeep(Shields);
	fnPrioritizedRollAndKeep(Weapons);
})();

// if ()

function fnPrint(name, message) {
	console.info("[" + name + "]: " + message);
}

function fnPrioritizedRollAndKeep(options) {
	let i, opt, optName, fnMissing, fnShouldUpgrade;
	for (i = 0; i < options.length; i++) {
		opt = options[i];
		if (opt === null) {
			continue;
		}

		if (typeof opt !== 'object') {
			continue;
		}
		optName = '<UNKNOWN>';
		if (Object.prototype.hasOwnProperty(opt, 'Name')) {
			optName = opt.Name;
		}
		fnMissing = null;
		if (Object.prototype.hasOwnProperty(opt, 'Missing')) {
			fnMissing = '';
			fnPrint(opt.Name, '`Missing` not found');
			continue;
		}
		if (!Object.prototype.hasOwnProperty(opt, 'ShouldUpgrade')) {
			fnPrint(opt.Name, '`ShouldUpgrade` not found');
			continue;
		}
		if (!Object.prototype.hasOwnProperty(opt, 'RollAndKeep')) {
			fnPrint(opt.Name, '`RollAndKeep` not found');
			continue;
		}
		if (!opt.missingOrShouldUpgrade()) {
			fnPrint(opt.Name, 'STOP: not missing and should not be upgraded')
			return;
		}
		if (!opt.missing() && opt.shouldUpgrade()) {
			fnPrint(opt.Name, 'STOP: not missing and should upgrade');
			opt.rollAndKeep();
			return;
		}
		fnPrint(opt.Name, 'roll and keep');
		opt.rollAndKeep();
	}
}


