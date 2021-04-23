//Create a script that prompts the visitor to enter two numbers and then shows their sum:
//trick here is that PROMPT returns a string.

let summer = {

	prompt: function() {
		this.a = parseFloat(prompt("choose a number"));
		this.b = parseFloat(prompt("choose another number"));
	},
	

	adder: function() {
		return this.a + this.b
	},

	show: function() {
		alert(this.adder())
	}
}

summer.prompt()
summer.show()

//OR

let summer = {

	prompt: function() {
		this.a = +(prompt("choose a number"));
		this.b = +(prompt("choose another number"));
	},
	

	adder: function() {
		return this.a + this.b
	},

	show: function() {
		alert(this.adder())
	}
}

summer.prompt()
summer.show()

// According to the documentation Math.round and toFixed both round to the nearst number: 

alert( 1.35.toFixed(1) ); // 1.4

// In the similar example below, why is 6.35 rounded to 6.3 and not 6.4?

alert( 6.35.toFixed(1) ); // 6.3

// how to ruond 6.35 the right way?

alert( 6.35.toFixed(1) );

// Internally the decimal fraction 6.35 is an endless binary. As always in such cases,
// it is stored with a precision loss. let's see:

alert( 6.35.toFixed(20) ); //6.3499999999999964473

// the precision loss can cause both increase and decrease of a number. in this particular
// case the number becomes a tiny biy less, that's why it rounded down

// And what's for 1.35?

alert( 1.35.toFixed(20) ); //1.35000000000000000000008882

// Here the precision loss made the number a little bit greater, so it rounded up.
// how can we fix the problem with 6.35 if we want it to be rounded the right way?

// we should bring it closer to an integer priour to rounding:

alert( (6.35 * 10).tofixed(20)); //63.50000000000000000000000000000000

// note that 63.5 has no precision loss at all. That's because the decimal part 0.5
// is actually 1/2. Fractions divided by powers of 2 are exactly represented in the
// binary system, now we can round it:

alert( Math.round(6.35 * 10) / 10); // 6.35 -> 63.5 -> 64(rounded) -> 6.4

// in the end there is an issue with rounding and binary (loss of precisions)

######################################################################################

//repeat until the input is a number

//create a funtion readNumber which prompts for a number until the visitors enters a valid
// numeric value. the resulting value must be returned as a number. the visitor can also stop
// the process by entering an empty line or pressing 'cancel'. in that case, the function
// should return null

let prompter = {
	readNumber: function(){
		this.value = prompt("input should be a number", '0');
		
		if(this.value == '' || this.value == null) {
			return null
		}

		while(isNaN(this.value)) {
			this.value = prompt("input should be a number", '0');
		} return +this.value
	}
}

prompter.readNumber()

// OR

function readNumber() {
	let num;

	do {
		num = prompt("Enter a number please?", 0);
	} while ( !isFinite(num) );

	if (num === null || num === '') return null;

	return +num;
}

alert(`Read: ${readNumber()}`);

// the solution is a little bit more intricate that it could be because we need to handle
// null / empty lines. So we actually accept the input until it is a 'regular number'.
// both null (cancel) and empty line also fit that condition, because in numeric form they are 0
// after we stopped, we need to treat null and empty line specially (return null), because
// converting them to a number would return 0

//final answer:

let prompter = {

	readNumber: function(){

		do {
			this.prompted = prompt("Enter a number please?", 0);
		} while ( !isFinite(this.prompted) );

		if (this.prompted === null || this.prompted === '') return null;

		return +this.prompted;
	}
}

alert(`Read: ${prompter.readNumber()}`);

// An occasional infinite loop. This loop is infinite. It never ends. Why?

let i = 0;
while (i != 10) {
	i += 0.2;
}

// because of precision loss, i never equals 10.
// evade equality checks when working with decimal fractions

// a random number from min to max

// the built in function Math.random() creates a random value from 0 to 1 (not including 1)
// write the function random(min, max) to generate a random floating-point number from min
// to max (not including max).

let generator = {

	min: 3, //choose any number
	max: 5,

	randomizer: function(min, max){
		return Math.random() * (this.max - this.min) + this.min;
	}
}

// we need to 'map' all values from the interval 0 ... 1 into values from min to max.
// that can be done in two stages:

// 1. if we multiply a random number from 0 ... 1 by max-min, then the interval of possible
// values increases 0 .. 1 to  0 .. max-min.
// 2. now if we add min, the possible interval becomes from min to max

// A random integer from min to max
// Create a function randomInteger(min, max) that generates a random integer number from
// min to max including both min and max as possible values.

// any number from the interval min..max must appear with the same probablity

let generator = {

	min: 3, //choose any number
	max: 5,

	randomizer: function(min, max){
		return Math.round(Math.random() * (max - min) + min);
	}
}

// this solution is simple, but doesn't work. Because the numbers at the edge have double
// the changes of being shown.

// this is the way

let generator = {

	randomizer: function(min, max){
		let rand = min + Math.random() * (max - min + 1);
		return Math.floor(rand);
	}
}

alert( generator.randomizer(1, 7) );