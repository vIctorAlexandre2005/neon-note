import { NeonNote } from '@/components/Notes/View';
import { useContextGlobal } from '@/Context';

export default function Home() {

  const { user } = useContextGlobal();

  return (
    <div className='h-full'>
      {user && <NeonNote />}

      {!user && null}
    </div>
  );
}
