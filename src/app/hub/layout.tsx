import PersistentVideo from '@/components/PersistentVideo/PersistentVideo';

export default function HubLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <PersistentVideo />
      {children}
    </>
  );
}
