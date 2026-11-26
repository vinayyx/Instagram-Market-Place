import { PLATFORM_ICONS } from "../Icon/PlatformIcons";

import BrandProfileField from "./BrandProfileField";

const platforms = [
  { key: "instagram", label: "Instagram", Icon: PLATFORM_ICONS.Instagram },
  { key: "facebook", label: "Facebook", Icon: PLATFORM_ICONS.Facebook },
  { key: "youtube", label: "YouTube", Icon: PLATFORM_ICONS.YouTube },
];

export default function BrandSocialLinks({
  links,
  onChange,
}) {
  return (
    <div className="grid gap-5 md:grid-cols-2">
      {platforms.map(({ key, label, Icon }) => (
        <div key={key} className="relative">
          <div className="absolute left-3 top-[42px] z-10 text-gray-500">
            <Icon size={17} />
          </div>

          <div className="[&_input]:pl-10">
            <BrandProfileField
              label={label}
              value={links[key]}
              placeholder={`Enter ${label} URL`}
              onChange={(value) => onChange(key, value)}
              type="url"
            />
          </div>
        </div>
      ))}
    </div>
  );
}