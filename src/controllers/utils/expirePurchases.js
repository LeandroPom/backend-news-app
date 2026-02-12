async function expirePurchases() {
  await Purchase.update(
    { status: "expired" },
    {
      where: {
        status: "pending",
        expires_at: { [Op.lt]: new Date() }
      }
    }
  );
}
