import Order from "../model/orders.js";
import mongoose from "mongoose";

export const createOrder = async (req, res) => {
  try {
    const userId = req.user.id;
    const {
      email,
      amount,
      reference,
      products,
      address,
      phoneNo,
      country,
      state,
      city,
      zip_code,
      fullname,
    } = req.body;

    const order = await Order.create({
      email,
      amount,
      reference,
      products,
      address,
      phoneNo,
      country,
      state,
      city,
      zip_code,
      fullname,
      userId,
    });
    order && res.status(200).json(order);
  } catch (er) {
    return res.status(500).json({ message: er.message });
  }
};

export const updateOrder = async (req, res) => {
  const { id } = req.params;
  if (!mongoose.Types.ObjectId.isValid(id))
    return res.status(404).send(`No order with Id ${id}`);
  try {
    const updatedOrder = await Order.findByIdAndUpdate(
      id,
      { $set: req.body },
      { new: true }
    );
    res.status(200).json(updatedOrder);
  } catch (er) {
    console.log(er);
    return res.status(500).json({ message: er.message });
  }
};

export const deleteOrder = async (req, res) => {
  const { id: _id } = req.params;
  if (!mongoose.Types.ObjectId.isValid(_id))
    return res.status(404).json({ message: "No order of such Id" });
  try {
    await Order.findByIdAndDelete(_id);
    res.status(200).json("order deleted");
  } catch (er) {
    return res.status(500).json({ message: er.message });
  }
};

export const getOrder = async (req, res) => {
  try {
    const order = await Order.find({ userId: req.params.userId });
    res.status(200).json(order);
  } catch (er) {
    return res.status(500).json({ message: er.message });
  }
};

export const getOrders = async (req, res) => {
  try {
    const orders = await Order.find();
    res.status(200).json(orders);
  } catch (er) {
    console.log(er);
    return res.status(500).json({ message: er.message });
  }
};

export const getIncomes = async (req, res) => {
  const date = new Date();
  const lastMonth = new Date(date.setMonth(date.getMonth() - 1));
  const prevMonth = new Date(new Date().setMonth(lastMonth.getMonth() - 1));

  try {
    const income = Order.aggregate([
      { $match: { createdAt: { $gte: prevMonth } } },
      {
        $project: {
          month: { $month: "$createdAt" },
          sales: "$amount",
        },
      },
      {
        $group: {
          _id: "$month",
          total: { $sum: "$sales" },
        },
      },
    ]);
    return res.status(200).json(income);
  } catch (er) {
    return res.status(500).json({ message: er.message });
  }
};
