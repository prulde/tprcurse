function clearPage(): void {
	while (document.body.firstChild) {
		document.body.removeChild(document.body.firstChild);
	}
}

interface Nd {
	name: string;
	parent: TreeNode | null;
	child1: TreeNode | null;
	child2: TreeNode | null;
	paramName: string | null;
	kParam1: number | null;
	kParam2: number | null;
}

class TreeNode {
	public static nodeNum: number = 0;
	public name: string;
	public parent: TreeNode | null = null;
	public child1: TreeNode | null = null;
	public child2: TreeNode | null = null;
	public paramName: string | null = null;
	public kParam1: number | null = null;
	public kParam2: number | null = null;

	constructor(name: string) {
		this.name = name;
		// this.name = nd.name;
		// this.parent = nd.parent;
		// this.child1 = nd.child1;
		// this.child2 = nd.child2;
		// this.paramName = nd.paramName;
		// this.kParam1 = nd.kParam1;
		// this.kParam2 = nd.kParam2;
	}
}

let vertNames: string[] = [];
let params: string[] = [];
let matrixInputs: Map<[string, string], number> = new Map();
let nodes: TreeNode[] = [];
let formulaParams: number[] = [];

// page1
(function numOfVertexes(): void {
	let div1: HTMLDivElement = document.createElement("div");
	let inp1: HTMLInputElement = document.createElement("input");
	let but1: HTMLInputElement = document.createElement("input");
	inp1.type = "text";
	but1.type = "button";
	but1.value = "Далее";
	but1.addEventListener("click", (e: Event): void => {
		TreeNode.nodeNum = parseInt(inp1.value);
		clearPage();
		paramInp();
	});

	div1.innerHTML = `
	<p>Введите количество вершин:</p>
	`;
	div1.appendChild(inp1);
	document.body.appendChild(div1);
	document.body.appendChild(but1);
})();

// page2 
function paramInp(): void {
	for (let i: number = 0; i < TreeNode.nodeNum; ++i) {
		let div1: HTMLDivElement = document.createElement("div");
		let inp1: HTMLInputElement = document.createElement("input");
		inp1.type = "text";
		inp1.id = "vertex";
		let inp2: HTMLInputElement = document.createElement("input");
		inp2.type = "text";
		inp2.id = "coefficient";
		div1.innerHTML = `
	<p>Параметры вершины №${i + 1}:</p>
	`;

		div1.innerHTML += `Название вершины `;
		div1.appendChild(inp1);
		// div1.innerHTML += ` Коэффициент эластичности вершины `;
		// div1.appendChild(inp2);

		document.body.appendChild(div1);

	}

	let but1: HTMLInputElement = document.createElement("input");
	but1.type = "button";
	but1.value = "Далее";
	but1.addEventListener("click", (e: Event): void => {
		document.body.querySelectorAll("input").forEach((inp) => {

			if (inp.id == "vertex") {

				vertNames.push(inp.value);

			}
			// else if (inp.id == "coefficient") {

			// 	params.push(inp.value);

			// }

		});

		for (let i: number = 0; i < vertNames.length; ++i) {
			let node1: TreeNode = new TreeNode(vertNames[i]);

			// node1.paramName = params[i];

			nodes.push(node1);
		}

		clearPage();
		matrix();
	});
	document.body.appendChild(but1);
}

// page 3
function matrix(): void {
	let table1: HTMLTableElement = document.createElement("table");
	for (let i: number = 0; i < TreeNode.nodeNum + 1; ++i) {
		let tr1: HTMLTableRowElement = document.createElement("tr");
		for (let j: number = 0; j < TreeNode.nodeNum + 1; ++j) {

			let td1: HTMLTableCellElement = document.createElement("td");

			if (i == 0 && j == 0) {
				tr1.appendChild(td1);
				continue;
			}

			if (i == 0) {
				td1.innerText = `${vertNames[j - 1]}`;
				tr1.appendChild(td1);
				continue;
			} else if (j == 0) {
				td1.innerText = `${vertNames[i - 1]}`;
				tr1.appendChild(td1);
				continue;
			}

			let inp1: HTMLInputElement = document.createElement("input");

			td1.appendChild(inp1);
			tr1.appendChild(td1);
		}

		table1.appendChild(tr1);
	}

	document.body.appendChild(table1);

	let but1: HTMLInputElement = document.createElement("input");
	but1.type = "button";
	but1.value = "Далее";
	but1.addEventListener("click", (e: Event): void => {

		let count: number = 0;
		let rootNode: boolean = true;
		document.body.querySelectorAll("input").forEach((inp) => {
			if (inp.type != "text")
				return;

			let row: number = Math.floor(count / TreeNode.nodeNum);
			let col: number = count - (row * TreeNode.nodeNum);

			if (row == col || col < row) {
				count++;
				return;
			}

			if (inp.value == "1") {
				if (nodes[row].child1 == null) {

					nodes[row].child1 = nodes[col];
					nodes[col].parent = nodes[row];
				}
				else if (nodes[row].child2 == null) {

					nodes[row].child2 = nodes[col];
					nodes[col].parent = nodes[row];
				}
			}

			count++;
		});

		clearPage();
		coef();
	});
	document.body.appendChild(but1);
}

// page 4
function coef(): void {
	let table1: HTMLTableElement = document.createElement("table");
	for (let i: number = 0; i < 2; ++i) {
		let tr1: HTMLTableRowElement = document.createElement("tr");
		for (let j: number = 0; j < 4; ++j) {

			let td1: HTMLTableCellElement = document.createElement("td");

			// if (i == 0 && j == 0) {
			// 	tr1.appendChild(td1);
			// 	continue;
			// }

			if (i == 0 && j == 0) {
				td1.innerText = `Объем продаж`;
				tr1.appendChild(td1);
				continue;
			} else if (i == 0 && j == 1) {
				td1.innerText = `Цена`;
				tr1.appendChild(td1);
				continue;
			} else if (i == 0 && j == 2) {
				td1.innerText = `Постоянные издержки`;
				tr1.appendChild(td1);
				continue;
			} else if (i == 0 && j == 3) {
				td1.innerText = `Переменные издержки`;
				tr1.appendChild(td1);
				continue;
			}


			let inp1: HTMLInputElement = document.createElement("input");

			td1.appendChild(inp1);
			tr1.appendChild(td1);
		}

		table1.appendChild(tr1);
	}

	document.body.appendChild(table1);

	let but1: HTMLInputElement = document.createElement("input");
	but1.type = "button";
	but1.value = "Далее";
	but1.addEventListener("click", (e: Event): void => {

		let count: number = 0;
		document.body.querySelectorAll("input").forEach((inp) => {
			formulaParams.push(parseInt(inp.value));
			count++;
		});

		clearPage();
		makeTree();
	});
	document.body.appendChild(but1);
	// document.body.innerHTML += `
	// <p>Введите коэффициенты эластичности</p>
	// `;

	// let count: number = -1;
	// params.forEach(par => {

	// 	count++;

	// 	if (par == "")
	// 		return;

	// 	nodes[count].paramName = par;

	// 	let div1: HTMLDivElement = document.createElement("div");
	// 	let inp1: HTMLInputElement = document.createElement("input");
	// 	inp1.type = "text";
	// 	let inp2: HTMLInputElement = document.createElement("input");
	// 	inp2.type = "text";

	// 	inp1.classList.add(`${nodes[count].paramName}`);
	// 	inp2.classList.add(`${nodes[count].paramName}`);

	// 	div1.innerHTML += `${par}(1) `;
	// 	div1.appendChild(inp1);
	// 	div1.innerHTML += `${par}(2) `;
	// 	div1.appendChild(inp2);

	// 	document.body.appendChild(div1);
	// });


	// let but1: HTMLInputElement = document.createElement("input");
	// but1.type = "button";
	// but1.value = "Далее";
	// but1.addEventListener("click", (e: Event): void => {

	// 	let count: number = 0;
	// 	document.body.querySelectorAll("input").forEach((inp) => {
	// 		nodes.forEach(node => {
	// 			if (node.paramName != null && node.paramName == inp.className) {
	// 				if (node.kParam1 == null)
	// 					node.kParam1 = parseInt(inp.value);
	// 				else
	// 					node.kParam2 = parseInt(inp.value);
	// 			}
	// 		});
	// 	});

	// 	console.log(nodes);

	// 	clearPage();
	// 	makeTree();
	// });
	// document.body.appendChild(but1);
}

function makeTree(): void {


	let chartDiv: HTMLDivElement = document.createElement("div");
	chartDiv.classList.add("chart");
	chartDiv.id = "basic-example";
	chartDiv.style.width = "1024px";;
	chartDiv.style.height = "1024px";

	document.body.appendChild(chartDiv);


	visualize(nodes);
}