const fa_times = '<i class="fas fa-times"></i>'

let instructions = [];
let tools = [];

class Instruction {
	constructor() {
		this.instruction = document.createElement('div');
		this.instruction.classList.add('instruction');
		this.instruction.draggable = true;

		// Icon
		this.iconelem = document.createElement('div')
		this.iconelem.classList.add('icon')
		this.iconelem.innerHTML = this.icon;
		this.instruction.appendChild(this.iconelem);

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

	get icon()
	{
		return Instruction.icon;
	}

	remove() {
		document.getElementById('instructions').removeChild(this.instruction);

		for (var i = 0; i < instructions.length; i++) {
			if (instructions[i] === this) {
				instructions.splice(i, 1);
				break;
			}
		}

		delete this;
	}

	static icon = '<i class="fas fa-question"></i>';
}

class Temperature extends Instruction {
	constructor() {
		super()
	}

	get icon()
	{
		return Temperature.icon;
	}

	static icon = '<i class="fas fa-thermometer-half"></i>';
}

class Tool {
	constructor(instruction_type) {
		this.button = document.createElement('button');
		this.button.classList.add('tool');
		this.button.innerHTML = instruction_type.icon;

		this.button.onclick = () => {
			let instruction = new instruction_type();
			instructions.push(instruction);
		}

		document.getElementById('tools').appendChild(this.button);
	}
}

window.onload = () => {
	console.log(Instruction.icon);
	console.log(Temperature.icon);
	console.log(Instruction.icon);
	tools.push(new Tool(Instruction));
	tools.push(new Tool(Temperature));

}
