import PersistentVideo from '@/components/PersistentVideo/PersistentVideo';

export default function MinecraftLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <PersistentVideo />
      {children}
    </>
  );
}
