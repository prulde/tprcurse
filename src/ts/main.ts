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
		div1.innerHTML += ` Коэффициент эластичности вершины `;
		div1.appendChild(inp2);

		document.body.appendChild(div1);

	}

	let but1: HTMLInputElement = document.createElement("input");
	but1.type = "button";
	but1.value = "Далее";
	but1.addEventListener("click", (e: Event): void => {
		document.body.querySelectorAll("input").forEach((inp) => {

			if (inp.id == "vertex") {

				vertNames.push(inp.value);

			} else if (inp.id == "coefficient") {

				params.push(inp.value);

			}

		});

		for (let i: number = 0; i < vertNames.length; ++i) {
			let node1: TreeNode = new TreeNode(vertNames[i]);
			node1.paramName = params[i];

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
		document.body.querySelectorAll("input").forEach((inp) => {
			if (inp.type != "text")
				return;

			let row: number = Math.floor(count / TreeNode.nodeNum);
			let col: number = count - (row * TreeNode.nodeNum);

			if (row == col || col < row) {
				count++;
				return;
			}

			if (nodes[row].parent == null && inp.value === "1")
				nodes[row].parent = nodes[col];
			else if (inp.value === "1") {
				if (nodes[row].child1 == null)
					nodes[row].child1 = nodes[col];
				else
					nodes[row].child2 = nodes[col];
			}

			matrixInputs.set([row.toString(), col.toString()], inp.value === "" ? 0 : parseInt(inp.value));
			count++;
		});

		clearPage();
		coef();
	});
	document.body.appendChild(but1);
}

// page 4
function coef(): void {
	document.body.innerHTML += `
	<p>Введите коэффициенты эластичности</p>
	`;

	let count: number = -1;
	params.forEach(par => {

		count++;

		if (par == "")
			return;

		nodes[count].paramName = par;

		let div1: HTMLDivElement = document.createElement("div");
		let inp1: HTMLInputElement = document.createElement("input");
		inp1.type = "text";
		let inp2: HTMLInputElement = document.createElement("input");
		inp2.type = "text";

		inp1.classList.add(`${nodes[count].paramName}`);
		inp2.classList.add(`${nodes[count].paramName}`);

		div1.innerHTML += `${par}(1) `;
		div1.appendChild(inp1);
		div1.innerHTML += `${par}(2) `;
		div1.appendChild(inp2);

		document.body.appendChild(div1);
	});


	let but1: HTMLInputElement = document.createElement("input");
	but1.type = "button";
	but1.value = "Далее";
	but1.addEventListener("click", (e: Event): void => {

		let count: number = 0;
		document.body.querySelectorAll("input").forEach((inp) => {
			nodes.forEach(node => {
				if (node.paramName != null && node.paramName == inp.className) {
					if (node.kParam1 == null)
						node.kParam1 = parseInt(inp.value);
					else
						node.kParam2 = parseInt(inp.value);
				}
			});
		});

		console.log(nodes);

		clearPage();
		makeTree();
	});
	document.body.appendChild(but1);
}

function makeTree(): void {

	let treeData: any =
	{

		nodeStructure: {
			text: { name: `ea` },
			children: [
				{
					text: { name: `s` },
				},
				{
					text: { name: `se` }
				}
			]
		}

	};

	treeConfig = {
		chart: {
			container: "#basic-example",

			connectors: {
				type: 'step'
			},
			node: {
				HTMLclass: 'nodeExample1'
			}
		},
		nodeStructure: {
			text: {
				name: "Mark Hill",
				title: "Chief executive officer",
				contact: "Tel: 01 213 123 134",
			},
			children: [
				{
					text: {
						name: "Joe Linux",
						title: "Chief Technology Officer",
					},
					stackChildren: true,
					children: [
						{
							text: {
								name: "Ron Blomquist",
								title: "Chief Information Security Officer"
							},
						},
						{
							text: {
								name: "Michael Rubin",
								title: "Chief Innovation Officer",
								contact: "we@aregreat.com"
							},
						}
					]
				},
				{
					stackChildren: true,
					text: {
						name: "Linda May",
						title: "Chief Business Officer",
					},
					children: [
						{
							text: {
								name: "Alice Lopez",
								title: "Chief Communications Officer"
							},
						},
						{
							text: {
								name: "Mary Johnson",
								title: "Chief Brand Officer"
							},
						},
						{
							text: {
								name: "Kirk Douglas",
								title: "Chief Business Development Officer"
							},
						}
					]
				},
				{
					text: {
						name: "John Green",
						title: "Chief accounting officer",
						contact: "Tel: 01 213 123 134",
					},
					children: [
						{
							text: {
								name: "Erica Reel",
								title: "Chief Customer Officer"
							},
						}
					]
				}
			]
		}
	};

	let chartDiv: HTMLDivElement = document.createElement("div");
	chartDiv.classList.add("chart");
	chartDiv.id = "basic-example";
	document.body.appendChild(chartDiv);


	visualize();
}