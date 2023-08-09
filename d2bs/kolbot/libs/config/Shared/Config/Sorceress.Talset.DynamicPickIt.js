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

(function () {
	fnPrioritize(MercArmor);
	fnPrioritize(MercWeapons);
	fnPrioritize(Armors);
	fnPrioritize(Heads);
	fnPrioritize(Shields);
	fnPrioritize(Weapons);
})();

let fnPrint = function (name, message) {
	console.info("[" + name + "]: " + message);
};

let fnPrioritize = function (options) {
	let i, opt;
	for (i = 0; i < options.length; i++) {
		opt = options[i];
		if (opt === null) {
			continue;
		}
		if (typeof opt !== 'object') {
			continue;
		}
		if (!Object.prototype.hasOwnProperty(opt, 'Name')) {
			continue;
		}
		if (!Object.prototype.hasOwnProperty(opt, 'MissingOrShouldUpgrade')) {
			fnPrint(opt.Name, '`MissingOrShouldUpgrade` not found');
			continue;
		}
		if (!Object.prototype.hasOwnProperty(opt, 'Missing')) {
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
		if (!opt.MissingOrShouldUpgrade()) {
			fnPrint(opt.Name, 'STOP: not missing and should not be upgraded')
			return;
		}
		if (!opt.Missing() && opt.ShouldUpgrade()) {
			fnPrint(opt.Name, 'STOP: not missing and should upgrade');
			opt.RollAndKeep();
			return;
		}
		fnPrint(opt.Name, 'roll and keep');
		opt.RollAndKeep();
	}
};


