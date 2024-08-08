import VideoPlayer from '../../components/VideoPlayer'; 

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24 bg-white">
      <div className="h-[458px]">
        <VideoPlayer />
      </div>
    </main>
  );
}
