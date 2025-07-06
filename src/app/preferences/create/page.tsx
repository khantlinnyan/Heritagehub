import Layout from "@/components/layout";
import PrefForm from "@/components/molecules/form/pref-form";
import Header from "@/components/ui/header";

export default function CreatePreference() {
  return (
    <Layout>
      <Header
        title="Create a new plan"
        subtitle="Plan your Myanmar adventure"
      />
      <PrefForm />
    </Layout>
  );
}
