import PersistentVideo from '@/components/PersistentVideo/PersistentVideo';

export default function ContentLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <PersistentVideo />
      {children}
    </>
  );
}
