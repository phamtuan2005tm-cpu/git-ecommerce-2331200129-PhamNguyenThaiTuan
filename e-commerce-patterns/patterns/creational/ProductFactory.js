class Product {
    constructor(details) {
        this.name = details.name || 'Generic Product';
        this.price = details.price || 0;
    }
    describe() {
        console.log(`${this.name} - $${this.price}`);
    }
    getPrice() {
        return this.price;
    }
    getDescription() {
        return this.name;
    }
}

class Book extends Product {
    constructor(details) {
        super(details);
        this.name = details.title;
        this.author = details.author || 'Unknown';
    }
    describe() {
        console.log(`Book: "${this.name}" by ${this.author} - $${this.price}`);
    }
}

class Electronic extends Product {
    constructor(details) {
        super(details);
        this.name = details.model;
        this.brand = details.brand || 'Unknown';
    }
    describe() {
        console.log(`Electronic: ${this.brand} ${this.name} - $${this.price}`);
    }
}

class ProductFactory {
    createProduct(type, details) {
        // TODO: Implement the Factory method.
        // Use a switch statement or if/else chain to check the `type`.
        // Based on the `type`, return a new instance of `Book`, `Electronic`, or a default `Product`.
        // Pass the `details` object to the constructor of the chosen class.
        switch (type.toLowerCase()) {
            case 'book':
                // Truyền nguyên object details vào constructor của Book
                return new Book(details); 
            
            case 'electronic':
                // Truyền nguyên object details vào constructor của Electronic
                return new Electronic(details); 
            
            default:
                // Mặc định cho các loại khác
                return new Product(details);
        }
    }
}

export { ProductFactory };
