import { useEffect, useMemo, useState, type ReactNode } from 'react';
import './UserPages.css';

const initialProfile = {
  name: 'Alex Nguyen',
  email: 'alex.nguyen@example.com',
  role: 'Attendee',
  pronouns: 'They/Them',
  location: 'Ho Chi Minh City, Vietnam',
  phone: '+84 123 456 789',
  linkedin: 'linkedin.com/in/alexnguyen',
  organization: 'TechNova Solutions',
  title: 'Senior UX Designer',
  bio: 'Yêu thích thiết kế trải nghiệm người dùng, AI và những sự kiện giúp kết nối cộng đồng công nghệ. Luôn tìm kiếm cơ hội gặp gỡ các nhà sáng tạo mới.',
};

const interests = ['Công nghệ', 'Thiết kế', 'AI & Machine Learning', 'Networking'];

const ProfilePage = () => {
  const [profile, setProfile] = useState(initialProfile);
  const [isEditing, setIsEditing] = useState(false);
  const [isDirty, setIsDirty] = useState(false);

  useEffect(() => {
    const warnBeforeLeave = (event: BeforeUnloadEvent) => {
      if (!isDirty) return;
      event.preventDefault();
      event.returnValue = '';
    };
    window.addEventListener('beforeunload', warnBeforeLeave);
    return () => window.removeEventListener('beforeunload', warnBeforeLeave);
  }, [isDirty]);

  const initials = useMemo(
    () => profile.name.split(' ').map((word) => word[0]).join('').slice(0, 2).toUpperCase(),
    [profile.name],
  );

  const updateField = (field: keyof typeof profile, value: string) => {
    setProfile((current) => ({ ...current, [field]: value }));
    setIsDirty(true);
  };

  const saveProfile = () => {
    setIsEditing(false);
    setIsDirty(false);
  };

  const cancelEdit = () => {
    setProfile(initialProfile);
    setIsEditing(false);
    setIsDirty(false);
  };

  return (
    <>
      <main className="user-main">
        {isDirty && <p className="dirty-warning">Bạn có thay đổi chưa lưu. Hãy lưu hồ sơ trước khi rời màn hình.</p>}

        <section className="profile-header glass-card">
          <div className="profile-header-inner">
            <div className="avatar-edit">
              <div className="user-avatar-lg avatar-fallback">{initials}</div>
              <button className="icon-btn" title="Chỉnh sửa avatar" type="button"><span className="ms">edit</span></button>
            </div>
            <div style={{ flex: 1 }}>
              <h1 className="profile-name">{profile.name}<span className="role-pill">{profile.role}</span></h1>
              <p className="profile-email"><span className="ms">mail</span>{profile.email}</p>
            </div>
            <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap' }}>
              {!isEditing ? (
                <button className="secondary-btn" onClick={() => setIsEditing(true)} type="button"><span className="ms">edit_note</span>Chỉnh sửa hồ sơ</button>
              ) : (
                <>
                  <button className="secondary-btn" onClick={cancelEdit} type="button">Hủy</button>
                  <button className="primary-btn" onClick={saveProfile} type="button"><span className="ms">save</span>Lưu thay đổi</button>
                </>
              )}
            </div>
          </div>
        </section>

        <section className="profile-grid">
          <div className="profile-stack">
            <ProfileSection title="Thông tin cá nhân" icon="person">
              <ProfileInput label="Họ tên" value={profile.name} readOnly={!isEditing} onChange={(value) => updateField('name', value)} />
              <ProfileInput label="Đại từ" value={profile.pronouns} readOnly={!isEditing} onChange={(value) => updateField('pronouns', value)} />
              <ProfileInput label="Địa điểm" value={profile.location} readOnly={!isEditing} onChange={(value) => updateField('location', value)} />
            </ProfileSection>
            <ProfileSection title="Thông tin liên hệ" icon="contact_mail">
              <ProfileInput label="Email" value={profile.email} readOnly={!isEditing} onChange={(value) => updateField('email', value)} />
              <ProfileInput label="Điện thoại" value={profile.phone} readOnly={!isEditing} onChange={(value) => updateField('phone', value)} />
              <ProfileInput label="LinkedIn" value={profile.linkedin} readOnly={!isEditing} onChange={(value) => updateField('linkedin', value)} />
            </ProfileSection>
          </div>

          <div className="profile-main-stack">
            <div className="profile-two-col">
              <ProfileSection title="Trường học hoặc công ty" icon="work">
                <ProfileInput label="Công ty / Trường học" value={profile.organization} readOnly={!isEditing} onChange={(value) => updateField('organization', value)} />
                <ProfileInput label="Vị trí / Ngành học" value={profile.title} readOnly={!isEditing} onChange={(value) => updateField('title', value)} />
              </ProfileSection>
              <ProfileSection title="Giới thiệu" icon="description">
                <div className="profile-field">
                  <label>Bio</label>
                  <textarea readOnly={!isEditing} rows={5} value={profile.bio} onChange={(event) => updateField('bio', event.target.value)} />
                </div>
              </ProfileSection>
            </div>
            <ProfileSection title="Danh mục sự kiện quan tâm" icon="loyalty">
              <div className="profile-tags">
                {interests.map((interest) => <span className="profile-tag" key={interest}>{interest}{isEditing && <span className="ms" style={{ marginLeft: 6, fontSize: 16 }}>close</span>}</span>)}
                {isEditing && <button className="pill-btn" type="button"><span className="ms">add_circle</span>Thêm danh mục</button>}
              </div>
            </ProfileSection>
          </div>
        </section>
      </main>
    </>
  );
};

const ProfileSection = ({ title, icon, children }: { title: string; icon: string; children: ReactNode }) => (
  <section className="profile-section glass-card hover-lift">
    <h2><span className="ms" style={{ color: 'var(--user-primary)' }}>{icon}</span>{title}</h2>
    <div className="profile-fields">{children}</div>
  </section>
);

const ProfileInput = ({ label, value, readOnly, onChange }: { label: string; value: string; readOnly: boolean; onChange: (value: string) => void }) => (
  <div className="profile-field">
    <label>{label}</label>
    <input readOnly={readOnly} value={value} onChange={(event) => onChange(event.target.value)} />
  </div>
);

export default ProfilePage;