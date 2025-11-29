export class Node {
	constructor(data) {
		this.data = data;
		this.left = null;
		this.right = null;
	}
}

export class Tree {
	constructor() {
		this.root = null;
	}

	buildTree(array) {
		const uniqueSorted = [...new Set(array)].sort((a, b) => a - b);

		const build = (arr, start, end) => {
			if (start > end) return null;

			const mid = Math.floor((start + end) / 2);
			const node = new Node(arr[mid]);

			node.left = build(arr, start, mid - 1);
			node.right = build(arr, mid + 1, end);

			return node;
		};

		this.root = build(uniqueSorted, 0, uniqueSorted.length - 1);
		return this.root;
	}

	insert(value) {
		this.root = this._insertRec(this.root, value);
	}

	_insertRec(root, key) {
		if (root === null) return new Node(key);

		if (key < root.data) {
			root.left = this._insertRec(root.left, key);
		} else if (key > root.data) {
			root.right = this._insertRec(root.right, key);
		}

		return root;
	}

	delete(value) {
		this.root = this.deleteItem(this.root, value);
	}

	getSuccessor(node) {
		let curr = node.right;
		while (curr !== null && curr.left !== null) {
			curr = curr.left;
		}
		return curr;
	}

	deleteItem(root, x) {
		if (root === null) return root;

		if (x < root.data) {
			root.left = this.deleteItem(root.left, x);
		} else if (x > root.data) {
			root.right = this.deleteItem(root.right, x);
		} else {
			// 0 or 1 child
			if (root.left === null) return root.right;
			if (root.right === null) return root.left;

			// 2 children
			const succ = this.getSuccessor(root);
			root.data = succ.data;

			root.right = this.deleteItem(root.right, succ.data);
		}

		return root;
	}

	find(value, node = this.root) {
		if (node === null) return null;

		if (value === node.data) return node;

		if (value < node.data) {
			return this.find(value, node.left);
		} else {
			return this.find(value, node.right);
		}
	}

	levelOrder(callback) {
		let queue = [];
		let result = [];
		let node = this.root;

		if (!node) return result;

		queue.push(node);

		while (queue.length > 0) {
			let current = queue.shift();

			if (callback) {
				result.push(callback(current));
			} else {
				result.push(current.data);
			}

			if (current.left) queue.push(current.left);
			if (current.right) queue.push(current.right);
		}

		return result;
	}

	preOrderForEach(callback, node = this.root, result = []) {
		if (node === null) return;

		if (callback) {
			callback(node);
		} else {
			result.push(node.data);
		}

		this.preOrderForEach(callback, node.left, result);
		this.preOrderForEach(callback, node.right, result);

		if (!callback) return result;
	}

	inOrderForEach(callback, node = this.root, result = []) {
		if (node === null) return;

		this.inOrderForEach(callback, node.left, result);

		if (callback) {
			callback(node);
		} else {
			result.push(node.data);
		}

		this.inOrderForEach(callback, node.right, result);

		if (!callback) return result;
	}

	postOrderForEach(callback, node = this.root, result = []) {
		if (node === null) return;

		this.postOrderForEach(callback, node.left, result);
		this.postOrderForEach(callback, node.right, result);

		if (callback) {
			callback(node);
		} else {
			result.push(node.data);
		}

		if (!callback) return result;
	}

	heightValue(value) {
		const node = this.find(value);
		if (!node) return null;
		return this.height(node);
	}

	height(node) {
		if (node === null) return -1;
		return 1 + Math.max(this.height(node.left), this.height(node.right));
	}

	depth(value, node = this.root, currentDepth = 0) {
		if (node === null) return null;
		if (value === node.data) return currentDepth;

		if (value < node.data) {
			return this.depth(value, node.left, currentDepth + 1);
		} else {
			return this.depth(value, node.right, currentDepth + 1);
		}
	}

	isBalanced(node = this.root) {
		if (node === null) return true;

		const leftHeight = this.height(node.left);
		const rightHeight = this.height(node.right);

		if (Math.abs(leftHeight - rightHeight) > 1) return false;

		return this.isBalanced(node.left) && this.isBalanced(node.right);
	}

	rebalance() {
		const sortedValues = this.inOrderForEach(null);
		this.root = this.buildTree(sortedValues);
		return this.root;
	}
}

export function prettyPrint(node, prefix = '', isLeft = true) {
	if (node === null) return;

	if (node.right !== null) {
		prettyPrint(node.right, `${prefix}${isLeft ? '│   ' : '    '}`, false);
	}

	console.log(`${prefix}${isLeft ? '└── ' : '┌── '}${node.data}`);

	if (node.left !== null) {
		prettyPrint(node.left, `${prefix}${isLeft ? '    ' : '│   '}`, true);
	}
}
