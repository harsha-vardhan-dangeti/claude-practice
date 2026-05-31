import Certifications from '../components/Certifications';
import Talks from '../components/Talks';

export default function AchievementsPage() {
  return (
    <div className="page-wrap">
      <Certifications />
      <div className="divider" />
      <Talks />
    </div>
  );
}
