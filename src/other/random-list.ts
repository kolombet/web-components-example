import { Collection, PrettyPrintable } from "./interfaces";

export default class RandomList<T extends Object> implements Collection<T>, PrettyPrintable {
	private items: T[];

	constructor(items: T[] = []) {
		this.items = items;
	}

	add(o: T): void {
		this.items.push(o);
	}

	remove(o: T): void {
		let index = this.items.indexOf(o);
		if (index > -1) this.removeByIndex(index);
	}

	prettyPrint() {
		return `[${this.items.map(item => item.toString()).join(',')}]`;
	}

	removeByIndex(index: number) {
		this.items.splice(index, 1);
	}

	getRandomIndex() {
		return Math.floor(Math.random() * this.items.length);
	}

	getRandom() {
		return this.items[this.getRandomIndex()];
	}

	removeRandom() {
		this.remove(this.getRandom());
	}
}