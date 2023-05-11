let treeConfig = [];

function visualize(nodes, formulaParams) {

	let config = {
		container: "#basic-example",

		connectors: {
			type: 'step'
		},
		node: {
			HTMLclass: 'nodeExample1'
		}
	};

	treeConfig.push(config);

	console.log(nodes);
	nodes.forEach(node => {

		// root node
		if (!node.parent) {
			let currentNode;
			if (formulaParams.length) {
				currentNode = {
					text: {
						name: node.name,
						volume: "Объем: " + formulaParams[0],
						price: "Цена: " + formulaParams[1],
						cost1: "Постоянные издержки: " + formulaParams[2],
						cost2: "Переменные издержки: " + formulaParams[3],
					},
				};
			} else {
				currentNode = {
					text: {
						name: node.name
					},
				};
			}

			treeConfig.push(currentNode);

			// frist child exists
			if (node.child1) {
				node.child1.parent = currentNode;
			}

			// second child exists
			if (node.child2) {
				node.child2.parent = currentNode;
			}
		} else if (node.parent) {
			let currentNode;
			if (node.profit) {
				currentNode = {
					parent: node.parent,
					text: {
						name: node.name,
						profit: "Увеличение выручки: " + node.profit,
						volume: "Процент прироста: " + node.volume + "%",
						coefficent: "K = " + node.coeff + "%"
					},
				};
			} else {
				currentNode = {
					parent: node.parent,
					text: {
						name: node.name,
					},
				};
			}


			treeConfig.push(currentNode);

			// frist child exists
			if (node.child1) {
				node.child1.parent = currentNode;
			}

			// second child exists
			if (node.child2) {
				node.child2.parent = currentNode;
			}
		}

	});

	Treant(treeConfig);
}