const fa_times = '<i class="fas fa-times"></i>'

let instructions = [];
let tools = [];

class Instruction {
	constructor() {
		this.instruction = document.createElement('div');
		this.instruction.classList.add('instruction');
		this.instruction.draggable = true;

		// Icon
		this.iconelem = document.createElement('div');
		this.iconelem.classList.add('icon');
		this.iconelem.innerHTML = this.icon;
		this.instruction.appendChild(this.iconelem);

		// Icon tooltip
		let tooltip = document.createElement('div');
		tooltip.classList.add('tooltiptext');
		tooltip.innerHTML = this.tooltip;

		this.iconelem.classList.add('tooltip');
		this.iconelem.appendChild(tooltip);

		// Options
		this.options = document.createElement('span');
		this.options.classList.add('options');
		this.instruction.appendChild(this.options);

		// Close button
		this.closebutton = document.createElement('button');
		this.closebutton.classList.add('remove');
		this.closebutton.innerHTML = fa_times;

		this.closebutton.onclick = () => {
			this.remove()
		};

		this.instruction.appendChild(this.closebutton);



		document.getElementById('instructions').appendChild(this.instruction);
	}

	get tooltip() {
		return Instruction.tooltip;
	}

	get icon() {
		return Instruction.icon;
	}

	remove() {
		document.getElementById('instructions').removeChild(this.instruction);

		for (var i = 0; i < instructions.length; i++) {
			if (instructions[i] === this) {
				instructions.splice(i, 1);
				if (instructions[i] != undefined) {
					instructions[i].focus_remove();
				}
				break;
			}
		}

		delete this;
	}

	focus_remove() {
		this.closebutton.focus();
	}

	static icon = '<i class="fas fa-question"></i>';
	static tooltip = 'instruction'
}

class Temperature extends Instruction {
	constructor() {
		super()
		this.options.appendChild(document.createTextNode("Temperature:"));
		this.input_temp = document.createElement('input');
		this.input_temp.type = 'number';
		this.options.appendChild(this.input_temp);
		this.options.appendChild(document.createTextNode("°C"));
	}

	get icon() {
		return Temperature.icon;
	}

	get tooltip() {
		return Temperature.tooltip;
	}

	static icon = '<i class="fas fa-thermometer-half"></i>';
	static tooltip = 'Temperature'
}

class Tool {
	constructor(instruction_type) {
		this.button = document.createElement('button');
		this.button.classList.add('tool');
		this.button.innerHTML = instruction_type.icon;

		let tooltip = document.createElement('span');
		tooltip.classList.add('tooltiptext');
		tooltip.innerHTML = instruction_type.tooltip;
		this.button.classList.add('tooltip');
		this.button.appendChild(tooltip);

		this.button.onclick = () => {
			let instruction = new instruction_type();
			instructions.push(instruction);
		}

		document.getElementById('tools').appendChild(this.button);
	}
}

window.onload = () => {
	tools.push(new Tool(Instruction));
	tools.push(new Tool(Temperature));

}
