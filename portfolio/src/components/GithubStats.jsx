import { githubStats, personal } from '../data/portfolio';
import { useGithubData } from '../hooks/useGithubData';
import { IconStar } from './Icons';

const u = githubStats.username;

const streakUrl =
  `https://streak-stats.demolab.com/?user=${u}&theme=transparent&hide_border=true&background=0e0e1a&ring=3b82f6&fire=60a5fa&currStreakLabel=60a5fa&sideLabels=8892a8&dates=4e5a72&sideNums=f0f2f8&currStreakNum=f0f2f8`;

const icons = {
  folder: <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 19a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5l2 3h9a2 2 0 0 1 2 2z"/></svg>,
  star:   <IconStar />,
  pr:     <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="18" cy="18" r="3"/><circle cx="6" cy="6" r="3"/><path d="M13 6h3a2 2 0 0 1 2 2v7"/><line x1="6" y1="9" x2="6" y2="21"/></svg>,
  commit: <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="4"/><line x1="1.05" y1="12" x2="7" y2="12"/><line x1="17.01" y1="12" x2="22.96" y2="12"/></svg>,
};

function StatValue({ loading, value }) {
  if (loading) return <span className="gh-skeleton" aria-label="Loading…" />;
  if (value === undefined || value === null) return <span>—</span>;
  return <span>{value.toLocaleString()}</span>;
}

// Native Overview card — no third-party service
function OverviewCard({ data, loading }) {
  const rows = [
    { label: 'Public Repos',  value: data?.publicRepos,  icon: icons.folder },
    { label: 'Total Stars',   value: data?.totalStars,   icon: icons.star   },
    { label: 'Pull Requests', value: data?.totalPRs,     icon: icons.pr     },
    { label: 'Total Commits', value: data?.totalCommits, icon: icons.commit },
    { label: 'Followers',     value: data?.followers,
      icon: <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>
    },
  ];

  return (
    <div className="gh-native-card">
      <div className="gh-native-title">
        <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0 1 12 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0 0 22 12.017C22 6.484 17.522 2 12 2z"/></svg>
        Stats — @{u}
      </div>
      {rows.map(r => (
        <div key={r.label} className="gh-native-row">
          <span className="gh-native-row-icon">{r.icon}</span>
          <span className="gh-native-row-label">{r.label}</span>
          <span className="gh-native-row-val">
            <StatValue loading={loading} value={r.value} />
          </span>
        </div>
      ))}
    </div>
  );
}

// Native Top Languages card — computed from repos API
function TopLangsCard({ data, loading }) {
  const langs = data?.topLangs || [];

  return (
    <div className="gh-native-card">
      <div className="gh-native-title">
        <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="16 18 22 12 16 6"/><polyline points="8 6 2 12 8 18"/></svg>
        Most Used Languages
      </div>

      {loading && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '.6rem', marginTop: '.5rem' }}>
          {[1,2,3,4].map(i => (
            <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '.6rem' }}>
              <span className="gh-skeleton" style={{ width: '80px', height: '12px' }} />
              <span className="gh-skeleton" style={{ flex: 1, height: '8px' }} />
              <span className="gh-skeleton" style={{ width: '30px', height: '12px' }} />
            </div>
          ))}
        </div>
      )}

      {!loading && langs.length === 0 && (
        <p style={{ color: 'var(--txt-3)', fontSize: '.8rem', marginTop: '.5rem' }}>No public repos found.</p>
      )}

      {!loading && langs.length > 0 && (
        <>
          {/* bar strip */}
          <div className="gh-lang-bar">
            {langs.map(l => (
              <div key={l.lang} className="gh-lang-bar-seg" style={{ width: `${l.pct}%`, background: l.color }} title={`${l.lang} ${l.pct}%`} />
            ))}
          </div>
          {/* legend */}
          <div className="gh-lang-list">
            {langs.map(l => (
              <div key={l.lang} className="gh-lang-item">
                <span className="gh-lang-dot" style={{ background: l.color }} />
                <span className="gh-lang-name">{l.lang}</span>
                <span className="gh-lang-pct">{l.pct}%</span>
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  );
}

export default function GithubStats() {
  const { data, loading, error } = useGithubData(u);

  return (
    <section id="github" aria-label="GitHub stats">
      <div className="container">
        <div className="section-eyebrow r">/ github</div>
        <h2 className="r d1" style={{ marginBottom: '.5rem' }}>GitHub Activity</h2>
        <p className="r d2" style={{ marginBottom: '2.5rem', maxWidth: '48ch' }}>
          Open-source work, contributions, and coding activity on{' '}
          <a href={personal.github.url} target="_blank" rel="noopener">@{u}</a>.
          {error && <span className="gh-error"> (Could not fetch live data)</span>}
        </p>

        {/* ── Highlight boxes ── */}
        <div className="gh-highlights r d2">
          {githubStats.highlights.map((h, i) => (
            <div key={i} className="gh-highlight-card">
              <div className="gh-highlight-icon">{icons[h.icon]}</div>
              <div className="gh-highlight-val">
                <StatValue loading={loading} value={data?.[h.key]} />
              </div>
              <div className="gh-highlight-lbl">{h.label}</div>
            </div>
          ))}
        </div>

        {/* ── Native stats cards ── */}
        <div className="gh-cards r d3">
          <div className="gh-card-wrap">
            <div className="gh-card-label">Overview</div>
            <OverviewCard data={data} loading={loading} />
          </div>
          <div className="gh-card-wrap">
            <div className="gh-card-label">Top Languages</div>
            <TopLangsCard data={data} loading={loading} />
          </div>
        </div>

        {/* ── Streak (demolab — working) ── */}
        <div className="gh-streak-wrap r d4">
          <div className="gh-card-label">Contribution Streak</div>
          <img src={streakUrl} alt="GitHub streak" className="gh-streak-img" loading="lazy" />
        </div>

        <div className="r d5" style={{ marginTop: '2rem' }}>
          <a href={personal.github.url} className="btn btn-ghost" target="_blank" rel="noopener">
            <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0 1 12 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0 0 22 12.017C22 6.484 17.522 2 12 2z"/></svg>
            View GitHub Profile
          </a>
        </div>
      </div>
    </section>
  );
}
