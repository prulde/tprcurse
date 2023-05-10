let treeConfig = [];

function visualize(nodes) {

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
			let currentNode = {
				text: {
					name: node.name
				},
			};

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

			let currentNode = {
				parent: node.parent,
				text: {
					name: node.name
				},
			};

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
