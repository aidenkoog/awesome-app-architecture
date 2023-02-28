import { User } from "../domain/user";
import { Cart } from "../domain/cart";
import { createOrder } from "../domain/order";

// Note that the port interfaces are in the _application layer_,
// but their implementation is in the _adapter_ layer.
import { usePayment } from "../services/paymentAdapter";
import { useNotifier } from "../services/notificationAdapter";
import { useCartStorage, useOrdersStorage } from "../services/storageAdapter";

export function useOrderProducts() {
  
  const notifier = useNotifier();
  const payment = usePayment();
  const orderStorage = useOrdersStorage();
  const cartStorage = useCartStorage();

  async function orderProducts(user: User, cart: Cart) {
    const order = createOrder(user, cart);
    const paid = await payment.tryPay(order.total);
    if (!paid) return notifier.notify("The payment wasn't successful 🤷");

    const { orders } = orderStorage;
    orderStorage.updateOrders([...orders, order]);
    cartStorage.emptyCart();
  }

  return { orderProducts };
}
