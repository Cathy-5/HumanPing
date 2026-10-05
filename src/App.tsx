import { useState } from 'react'
import {
  Activity, ArrowDownToLine, ArrowRight, ArrowUpRight,
  AudioLines, Bell, Check, CheckCheck, ChevronDown, CircleHelp, Clapperboard,
  Clock3, Command, Film, FolderOpen, Gauge, Headphones, Image, Layers2,
  ListChecks, MoreHorizontal, Pause, Play, Plus, RefreshCw, Settings2, Sparkles,
  WandSparkles, X,
} from 'lucide-react'

type Task = {
  id: number; name: string; description: string; status: 'done' | 'running' | 'waiting' | 'queued'
  icon: typeof Sparkles; meta?: string; subtask?: string
}

const initialTasks: Task[] = [
  { id: 1, name: 'Script prep', description: 'Clean up, structure & check pacing', status: 'done', icon: ListChecks, meta: '2 min' },
  { id: 2, name: 'Generate narration', description: 'ElevenLabs · “Warm & thoughtful”', status: 'done', icon: AudioLines, meta: '4 min' },
  { id: 3, name: 'Split into scenes', description: 'Find natural visual transitions', status: 'done', icon: Layers2, meta: '1 min' },
  { id: 4, name: 'Source visuals', description: 'Find or generate assets for each scene', status: 'waiting', icon: Image, meta: '1 ping', subtask: '12 of 24 scenes have a strong visual match' },
  { id: 5, name: 'Match audio & visuals', description: 'Align scenes to narration timing', status: 'queued', icon: Activity },
  { id: 6, name: 'Generate subtitles', description: 'Whisper · word-level timestamps', status: 'queued', icon: Clapperboard },
  { id: 7, name: 'Assemble draft', description: 'Render 1080p review cut', status: 'queued', icon: Film },
]

function App() {
  const [tasks, setTasks] = useState(initialTasks)
  const [pingResolved, setPingResolved] = useState(false)
  const [selectedVisual, setSelectedVisual] = useState(1)
  const [toast, setToast] = useState('')
  const [scriptTitle, setScriptTitle] = useState('The psychology of starting over')
  const [scriptOpen, setScriptOpen] = useState(false)
  const [running, setRunning] = useState(true)
  const [pingCount, setPingCount] = useState(1)
  const [presetOpen, setPresetOpen] = useState(false)
  const [showSignal, setShowSignal] = useState(false)
  const [signalMood, setSignalMood] = useState<'need' | 'working' | 'done'>('need')
  const [signalDetail, setSignalDetail] = useState('')

  const notify = (message: string) => { setToast(message); window.setTimeout(() => setToast(''), 2800) }

  const resolvePing = (kind: string) => {
    setPingResolved(true)
    setPingCount(0)
    setTasks((current) => current.map((task) => task.id === 4 ? { ...task, status: 'done', meta: kind === 'own' ? 'Your visual added' : 'Visual approved' } : task.id === 5 ? { ...task, status: 'running', meta: 'Matching scenes…' } : task))
    notify(kind === 'own' ? 'Your visual is in. Workflow resumed.' : 'Visual approved. Workflow resumed.')
  }

  const startRun = () => {
    if (!running) { setRunning(true); notify('Workflow resumed in the background.'); return }
    setRunning(false); notify('Workflow paused. Your progress is saved.')
  }

  const navClick = (section: string) => { notify(`${section} view is ready to build next.`) }

  const completed = tasks.filter((task) => task.status === 'done').length
  const progress = Math.round((completed / tasks.length) * 100)

  return (
    <div className="app-shell">
      <aside className="sidebar">
        <div className="brand-row"><a className="brand-mark" href="#home" aria-label="HumanPing home"><span className="brand-symbol"><span /><span /><span /><span /><span /></span></a><span className="brand-word">human<span>ping</span></span><button className="workspace-chevron" aria-label="Switch workspace"><ChevronDown size={15} /></button></div>
        <div className="workspace-pill"><div className="workspace-avatar">S</div><div className="workspace-copy"><strong>Sofia’s workspace</strong><span>Creator plan</span></div><MoreHorizontal size={18} className="muted" /></div>

        <div className="nav-group"><div className="nav-label">WORKSPACE</div>
          <button className="nav-item" onClick={() => navClick('Overview')}><Gauge /><span>Overview</span></button>
          <button className="nav-item active" onClick={() => navClick('Workflows')}><Layers2 /><span>Workflows</span><span className="nav-count">3</span></button>
          <button className="nav-item" onClick={() => navClick('Activity')}><Activity /><span>Activity</span></button>
          <button className="nav-item" onClick={() => navClick('Pings')}><Bell /><span>Pings</span>{pingCount > 0 && <span className="ping-dot" />}</button>
        </div>

        <div className="nav-group presets-group"><div className="nav-label">YOUR PRESETS <button className="add-preset" aria-label="Add preset" onClick={() => setPresetOpen(true)}><Plus size={15} /></button></div>
          <button className="nav-item preset-item" onClick={() => setPresetOpen(true)}><span className="preset-icon voice-icon"><AudioLines size={15} /></span><span>Voice & narration</span></button>
          <button className="nav-item preset-item" onClick={() => setPresetOpen(true)}><span className="preset-icon visual-icon"><Image size={15} /></span><span>Visual style</span></button>
          <button className="nav-item preset-item" onClick={() => setPresetOpen(true)}><span className="preset-icon export-icon"><Film size={15} /></span><span>Export settings</span></button>
        </div>

        <div className="sidebar-bottom"><div className="usage-card"><div className="usage-heading"><span>MONTHLY RUNS</span><CircleHelp size={14} /></div><div className="usage-numbers"><strong>12</strong><span>/ 50</span><span className="usage-this-month">this month</span></div><div className="usage-track"><span /></div></div><button className="nav-item"><Settings2 /><span>Settings</span></button><div className="profile"><div className="profile-avatar">SM</div><div className="profile-text"><strong>Sofia Martin</strong><span>Personal workspace</span></div><MoreHorizontal size={19} className="muted" /></div></div>
      </aside>

      <main className="main-area">
        <header className="topbar"><div className="breadcrumb"><span>Workflows</span><span className="crumb-slash">/</span><span className="crumb-current">YouTube production</span><span className="workflow-badge">WORKFLOW</span></div><div className="topbar-actions"><button className="icon-button" aria-label="Help"><CircleHelp size={18} /></button><button className="icon-button notification-button" aria-label="Notifications"><Bell size={18} />{pingCount > 0 && <span />}</button><div className="topbar-avatar">SM</div></div></header>

        <div className="page-content"><div className="page-head"><div><div className="eyebrow"><span className="eyebrow-dot" /> YOUR WORKFLOWS <span className="eyebrow-divider">/</span> YOUTUBE</div><h1>Make the video. <em>Skip the busywork.</em></h1><p className="page-subtitle">A production workflow that runs on its own—and knows when to bring you in.</p></div><button className="more-button" aria-label="More workflow options"><MoreHorizontal size={19} /></button></div>

          <section className="signal-banner"><div className="signal-animal" aria-hidden="true"><span className="signal-ear ear-left"/><span className="signal-ear ear-right"/><span className="signal-face"><i/><i/><b/></span><span className="signal-tail"/></div><div className="signal-copy"><span className="signal-eyebrow"><span/> A NEW WAY TO PING</span><h2>Teach your AI to tap you on the shoulder.</h2><p>Like a pet with a button, your workflow learns when to ask, when to wait, and when it’s safe to keep going.</p></div><button className="signal-try" onClick={() => setShowSignal((open) => !open)}>{showSignal ? 'Close demo' : 'Try the signal board'} <ArrowRight size={14}/></button></section>

          {showSignal && <section className="signal-board"><div className="signal-board-head"><div><span className="section-kicker">SIGNAL BOARD · DEMO</span><h2>What should HumanPing do?</h2></div><button className="signal-close" onClick={() => setShowSignal(false)} aria-label="Close demo"><X size={17}/></button></div><p className="signal-board-intro">One small set of signals makes the workflow’s intent visible at a glance.</p><div className="signal-choice-grid"><button className={`signal-choice signal-need ${signalMood === 'need' ? 'chosen' : ''}`} onClick={() => setSignalMood('need')}><span className="signal-led led-need"/><span className="signal-choice-text"><strong>I need your judgment</strong><small>Pause this branch and send a ping</small></span>{signalMood === 'need' && <Check size={15}/>}</button><button className={`signal-choice signal-working ${signalMood === 'working' ? 'chosen' : ''}`} onClick={() => setSignalMood('working')}><span className="signal-led led-working"/><span className="signal-choice-text"><strong>I’m working on it</strong><small>Keep going quietly in the background</small></span>{signalMood === 'working' && <Check size={15}/>}</button><button className={`signal-choice signal-done ${signalMood === 'done' ? 'chosen' : ''}`} onClick={() => setSignalMood('done')}><span className="signal-led led-done"/><span className="signal-choice-text"><strong>This part is done</strong><small>Continue to the next safe step</small></span>{signalMood === 'done' && <Check size={15}/>}</button></div><div className="signal-demo-row"><div className={`demo-pet pet-${signalMood}`}><span className="pet-ear pet-ear-a"/><span className="pet-ear pet-ear-b"/><span className="pet-head"><i/><i/><b/></span><span className="pet-shadow"/></div><div className="demo-response"><span className="demo-response-label">THE WORKFLOW SIGNALS</span><strong>{signalMood === 'need' ? '“I found 3 good options. Which one feels right?”' : signalMood === 'working' ? '“I’m matching the remaining scenes. No need to check in.”' : '“Subtitles are ready. I’ve started assembling your draft.”'}</strong><span>{signalMood === 'need' ? '12 scenes · visual direction · waiting on you' : signalMood === 'working' ? 'Scene matching · 8 of 24 · next update only if blocked' : 'Subtitle generation · complete · assembly queued'}</span></div></div><div className="signal-teach"><label htmlFor="signal-detail">Teach HumanPing what this signal means <span>OPTIONAL</span></label><div><input id="signal-detail" value={signalDetail} onChange={(event) => setSignalDetail(event.target.value)} placeholder="e.g. Ask me if confidence is below 80%"/><button onClick={() => notify(signalDetail.trim() ? 'Signal preference saved for this demo.' : 'Add a preference first.')}>Save signal <ArrowRight size={13}/></button></div><small>In a real workflow, this becomes a rule that persists across runs.</small></div></section>}

          <section className="workflow-card"><div className="workflow-card-top"><div className="workflow-icon"><Clapperboard size={21} /></div><div className="workflow-title-block"><div className="workflow-title-row"><h2>YouTube video production</h2><span className="status-live"><span />{running ? 'ACTIVE' : 'PAUSED'}</span></div><p>From finished script to a first-cut video, ready for your review.</p></div><button className="workflow-menu"><MoreHorizontal size={19} /></button></div>
            <div className="workflow-meta"><span><Clock3 size={14} /> Runs in the background</span><i /><span><Bell size={14} /> Pings only when you’re needed</span><i /><span><RefreshCw size={13} /> Retries on failure</span></div>
            <div className="workflow-footer"><div className="workflow-footer-left"><span className="run-indicator"><span /> {running ? 'RUNNING NOW' : 'PAUSED'}</span><span className="footer-separator">·</span><span>Last run 18 min ago</span><span className="footer-separator">·</span><span>12 runs this month</span></div><button className="edit-workflow" onClick={() => notify('Workflow editor opened.')}>Edit workflow <ArrowUpRight size={14} /></button></div>
          </section>

          <div className="section-heading"><div><span className="section-kicker">IN PROGRESS</span><h2>Your video is taking shape<span className="heading-period">.</span></h2><p className="section-caption">Started today at 10:42 AM <span>·</span> Running in the background</p></div><button className="run-button" onClick={startRun}>{running ? <><Pause size={15} /> Pause run</> : <><Play size={15} /> Resume run</>}</button></div>

          <section className="run-board"><div className="run-topline"><div className="run-topline-left"><div className={`run-pulse ${running ? '' : 'pulse-paused'}`} /><span>VIDEO PRODUCTION</span><span className="run-id">RUN-029</span></div><div className="autosave"><Check size={13} /> Autosaved</div></div>
            <div className="script-source"><div className="script-file-icon"><FolderOpen size={18} /></div><div className="script-info"><span className="script-label">SOURCE SCRIPT</span>{scriptOpen ? <input value={scriptTitle} onChange={(e) => setScriptTitle(e.target.value)} onBlur={() => setScriptOpen(false)} autoFocus /> : <button className="script-title" onClick={() => setScriptOpen(true)}>{scriptTitle}<ArrowUpRight size={13} /></button>}</div><span className="script-meta">2,840 words <span>·</span> 14 min</span><button className="source-menu"><MoreHorizontal size={18} /></button></div>

            <div className="progress-wrap"><div className="progress-summary"><span>{completed} of {tasks.length} steps complete</span><span>{progress}%</span></div><div className="progress-track"><span style={{ width: `${progress}%` }} /></div></div>

            <div className="step-list">{tasks.map((task, index) => { const Icon = task.icon; return <div key={task.id} className={`step-row step-${task.status}`}><div className="step-rail"><div className="step-node">{task.status === 'done' ? <Check size={12} strokeWidth={3} /> : task.status === 'running' ? <span className="node-spinner" /> : <Icon size={14} />}</div>{index < tasks.length - 1 && <div className="step-connector" />}</div><div className="step-main"><div className="step-top"><div className="step-copy"><span className="step-name">{task.name}</span><span className="step-description">{task.description}</span></div><div className="step-right">{task.status === 'done' ? <><span className="step-meta">{task.meta}</span><span className="step-check"><Check size={12} /></span></> : task.status === 'running' ? <span className="running-label"><span className="tiny-spinner" /> {task.meta ?? 'PROCESSING'}</span> : task.status === 'waiting' ? <span className="needs-you">NEEDS YOU</span> : <span className="step-meta queued-label">UP NEXT</span>}</div></div>{task.subtask && !pingResolved && <span className="step-subtask"><span />{task.subtask}</span>}</div></div>})}</div>

            {pingResolved ? <div className="resumed-banner"><div className="resumed-icon"><CheckCheck size={16} /></div><div><strong>Good call. We’ve got it from here.</strong><span>Your choice is saved and the workflow has resumed automatically.</span></div><span className="resumed-state"><span /> RUNNING</span></div> : <div className="ping-card"><div className="ping-topline"><div className="ping-icon"><Sparkles size={17} /></div><div className="ping-title-copy"><span className="ping-label">A HUMAN PING <span className="ping-unread">NEW</span></span><h3>One creative call, then we keep going.</h3></div><span className="ping-time">JUST NOW</span><button className="ping-dismiss" aria-label="Dismiss ping" onClick={() => notify('Ping snoozed. You can find it in Pings.')}><X size={17} /></button></div><p className="ping-question">12 scenes don’t have a strong visual match. Pick the direction you like and we’ll source the rest to match.</p>
              <div className="visual-options">{[{ n: 1, label: 'Archival photos', sub: 'Human, nostalgic', color: 'warm', icon: '⌁' }, { n: 2, label: 'Soft illustrations', sub: 'Calm, considered', color: 'lavender', icon: '◌' }, { n: 3, label: 'Blend both', sub: 'Varied, cohesive', color: 'mixed', icon: '◍' }].map((option) => <button key={option.n} className={`visual-option ${selectedVisual === option.n ? 'selected' : ''}`} onClick={() => setSelectedVisual(option.n)}><div className={`option-art ${option.color}`}><div className="art-sun" /><div className="art-hill" /><span className="art-glyph">{option.icon}</span><span className="option-number">0{option.n}</span></div><span className="option-caption"><span>{option.label}</span><small>{option.sub}</small></span>{selectedVisual === option.n && <span className="option-check"><Check size={11} /></span>}</button>)}</div>
              <div className="ping-bottom"><button className="own-visual" onClick={() => resolvePing('own')}><Plus size={14} /> I have my own visual</button><button className="approve-button" onClick={() => resolvePing('approved')}>Use this direction <ArrowRight size={15} /></button></div>
            </div>}

            <div className="run-footer"><span><Clock3 size={13} /> Started 10:42 AM</span><span className="run-footer-divider">·</span><span><RefreshCw size={12} /> All steps retry automatically</span><span className="run-footer-spacer" /><button onClick={() => notify('Run log opened.')}>View run log <ArrowRight size={13} /></button></div>
          </section>

          <div className="bottom-note"><div className="bottom-note-icon"><WandSparkles size={15} /></div><span><strong>Built to keep moving.</strong> Independent steps continue while you decide. Your place is always saved.</span><button onClick={() => notify('Learn more about HumanPing.')}>How it works <ArrowRight size={13} /></button></div>
        </div>
      </main>

      <div className="keyboard-hint"><Command size={12} /> <span>K</span><span className="keyboard-hint-label">Quick actions</span></div>
      {toast && <div className="toast"><CheckCheck size={16} />{toast}</div>}
      {presetOpen && <div className="modal-backdrop" onMouseDown={(e) => { if (e.target === e.currentTarget) setPresetOpen(false) }}><section className="preset-modal"><div className="modal-header"><div><span className="section-kicker">YOUR LIBRARY</span><h2>Production presets</h2></div><button className="icon-button" onClick={() => setPresetOpen(false)} aria-label="Close"><X size={18} /></button></div><p>Set your defaults once. HumanPing uses them automatically every run.</p><div className="preset-setting"><div className="preset-icon voice-icon"><Headphones size={16} /></div><div><strong>Voice & narration</strong><span>ElevenLabs · Warm & thoughtful · Stability 65%</span></div><button onClick={() => notify('Voice preset settings opened.')}>Edit <ArrowRight size={13} /></button></div><div className="preset-setting"><div className="preset-icon visual-icon"><Image size={16} /></div><div><strong>Visual style</strong><span>Soft illustrations · Muted earth tones</span></div><button onClick={() => notify('Visual preset settings opened.')}>Edit <ArrowRight size={13} /></button></div><div className="preset-setting"><div className="preset-icon export-icon"><ArrowDownToLine size={16} /></div><div><strong>Export settings</strong><span>1080p · 24 fps · H.264</span></div><button onClick={() => notify('Export preset settings opened.')}>Edit <ArrowRight size={13} /></button></div><button className="add-new-preset" onClick={() => notify('New preset setup opened.')}><Plus size={15} /> Add a preset</button><div className="modal-tip"><Sparkles size={14} /> These are defaults, not rules. Every run can override them.</div></section></div>}
    </div>
  )
}

export default App
