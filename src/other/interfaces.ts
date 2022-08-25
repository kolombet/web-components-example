export interface Collection<T> {
	add(o: T): void;
	remove(o: T): void;
}

export interface PrettyPrintable {
	prettyPrint(): string;
}