import { InventoryService } from '../../services/InventoryService.js';
import { PaymentService } from '../../services/PaymentService.js';
import { ShippingService } from '../../services/ShippingService.js';

class CheckoutFacade {
    constructor() {
        this.inventoryService = new InventoryService();
        this.paymentService = new PaymentService();
        this.shippingService = new ShippingService();
    }

    // placeOrder(orderDetails) {
    //     // TODO: Implement the Facade method.
    //     // This method should orchestrate the calls to the subsystem services
    //     // in the correct order to simplify the checkout process.
    //     // 1. Check if all products are in stock using `inventoryService.checkStock()`.
    //     // 2. If they are, process the payment using `paymentService.processPayment()`.
    //     // 3. If payment is successful, arrange shipping using `shippingService.arrangeShipping()`.
    //     // 4. Log the result of each step. If a step fails, log it and stop.
    // }
    
    placeOrder(orderDetails) {
        console.log("--- Facade: Processing Order ---");

        // 1. Kiểm tra kho (Yêu cầu gọi subsystem) [cite: 52, 53]
        const items = orderDetails.items || [];
        items.forEach(item => {
            this.inventoryService.checkStock(item);
        });

        // 2. Thanh toán (Payment) [cite: 53]
        // Lưu ý: Đảm bảo truyền đúng thuộc tính mà PaymentService cần (thường là userId, amount)
        const paymentSuccess = this.paymentService.processPayment(
            orderDetails.userId || "Guest", 
            orderDetails.totalAmount || 0
        );

        if (paymentSuccess) {
            // 3. Vận chuyển (Shipping) [cite: 53]
            // Đảm bảo truyền đúng địa chỉ hoặc thông tin user
            this.shippingService.arrangeShipping(
                orderDetails.userId || "Guest", 
                orderDetails.shippingAddress || "N/A"
            );
            
            console.log("--- Facade: Order Completed Successfully ---");
            return true;
        }

        console.log("Facade: Order failed at payment step.");
        return false;
    }
}

export { CheckoutFacade };
