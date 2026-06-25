export default function ContractorDashboard() {
  return (
    <main className="p-8">
      <h1 className="text-2xl font-bold mb-4">Contractor Dashboard</h1>
      {/* TODO: list open jobs matching contractor.trade + serviceRadius,
          show payoutsEnabled status, link to Stripe onboarding if false */}
      <p className="text-gray-500">Open jobs near you will appear here.</p>
    </main>
  );
}
