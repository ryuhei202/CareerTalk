import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/app/_components/ui/card";
import { Input } from "@/app/_components/ui/input";
import { Label } from "@/app/_components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/app/_components/ui/radio-group";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/app/_components/ui/select";
import { X } from "lucide-react";
import type { Company, Occupation, SearchParams } from "../page";

const YEARS_OF_EXPERIENCE = [
  {
    id: 1,
    range: {
      min: 0,
      max: 5,
    },
  },
  {
    id: 2,
    range: {
      min: 5,
      max: 10,
    },
  },
  {
    id: 3,
    range: {
      min: 10,
      max: 100,
    },
  },
];

const HIRING_TYPE = [
  {
    id: 1,
    value: "NEW_GRADUATE",
    label: "新卒入社",
  },
  {
    id: 2,
    value: "MID_CAREER",
    label: "中途入社",
  },
  {
    id: 3,
    value: "BOTH",
    label: "両方",
  },
] as const;

const MEETING_METHOD = [
  {
    id: 1,
    value: "ONLINE",
    label: "オンライン",
  },
  {
    id: 2,
    value: "OFFLINE",
    label: "対面",
  },
  {
    id: 3,
    value: "BOTH",
    label: "全て",
  },
];

export default function SearchEmployeeBox({
  occupations,
  companies,
  keyword,
  setKeyword,
  addTag,
  removeTag,
  tags,
  onChangeParamsMethods,
  currentParams,
}: {
  occupations: Occupation[];
  companies: Company[];
  keyword: string;
  setKeyword: (keyword: string) => void;
  addTag: (tag: string) => void;
  removeTag: (tag: string) => void;
  tags: string[];
  currentParams: SearchParams;
  onChangeParamsMethods: {
    onChangeCompany: (value: string) => void;
    onChangeOccupation: (value: string) => void;
    onChangeExperienceOfYears: (value: string) => void;
    onChangeHiringType: (value: string) => void;
    onChangeMeetingMethod: (value: string) => void;
  };
}) {
  return (
    <Card className="w-full max-w-md mx-auto bg-white shadow-lg bg-[#f0f7ff] ">
      <CardHeader>
        <CardTitle>社員検索</CardTitle>
        <CardDescription>条件を指定して社員を検索できます</CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="relative">
          <Input
            type="text"
            placeholder="キーワード"
            value={keyword}
            onChange={(e) => setKeyword(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                e.preventDefault();
                addTag(keyword);
              }
            }}
            className="w-full pr-8 border-gray-300 rounded-full bg-white"
          />
          {keyword && (
            <button
              type="button"
              onClick={() => setKeyword("")}
              className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
            >
              <X className="h-4 w-4" />
            </button>
          )}
        </div>
        <div className="flex flex-wrap gap-2">
          {tags.map((tag) => (
            <span
              key={tag}
              className="bg-[#e0f0ff] text-blue-800 text-xs font-semibold px-3 py-1 rounded-full flex items-center"
            >
              {tag}
              <button
                type="button"
                onClick={() => removeTag(tag)}
                className="ml-1 text-blue-600 hover:text-blue-800"
              >
                <X className="h-3 w-3" />
              </button>
            </span>
          ))}
        </div>
        <div className="space-y-4">
          {[
            {
              id: "company",
              label: "会社",
              content: (
                <Select
                  onValueChange={onChangeParamsMethods.onChangeCompany}
                  defaultValue={currentParams.company}
                >
                  <SelectTrigger
                    id="company"
                    className="w-full border-gray-300 rounded-md bg-white"
                  >
                    <SelectValue placeholder="会社を選択" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">会社を選択</SelectItem>
                    {companies.map((company) => (
                      <SelectItem
                        key={company.id}
                        value={company.id.toString()}
                      >
                        {company.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              ),
            },
            {
              id: "occupation",
              label: "職種",
              content: (
                <Select
                  onValueChange={onChangeParamsMethods.onChangeOccupation}
                  defaultValue={currentParams.occupation}
                >
                  <SelectTrigger
                    id="occupation"
                    className="w-full border-gray-300 rounded-md bg-white"
                  >
                    <SelectValue placeholder="職種を選択" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">職種を選択</SelectItem>
                    {occupations.map((occupation) => (
                      <SelectItem
                        key={occupation.id}
                        value={occupation.id.toString()}
                      >
                        {occupation.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              ),
            },
            {
              id: "experience",
              label: "年次",
              content: (
                <Select
                  onValueChange={
                    onChangeParamsMethods.onChangeExperienceOfYears
                  }
                  defaultValue={currentParams.experience}
                >
                  <SelectTrigger
                    id="experience"
                    className="w-full border-gray-300 rounded-md bg-white"
                  >
                    <SelectValue placeholder="年次を選択" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">年次を選択</SelectItem>
                    <SelectItem value={YEARS_OF_EXPERIENCE[0].id.toString()}>
                      1年目~4年目
                    </SelectItem>
                    <SelectItem value={YEARS_OF_EXPERIENCE[1].id.toString()}>
                      5年目~10年目
                    </SelectItem>
                    <SelectItem value={YEARS_OF_EXPERIENCE[2].id.toString()}>
                      10年目以降
                    </SelectItem>
                  </SelectContent>
                </Select>
              ),
            },
            {
              id: "hiringType",
              label: "入社タイミング",
              content: (
                <RadioGroup
                  defaultValue={currentParams.hiringType}
                  className="flex space-x-4 mt-2"
                  onValueChange={onChangeParamsMethods.onChangeHiringType}
                >
                  {HIRING_TYPE.map((hiringType) => (
                    <div
                      key={hiringType.id}
                      className="flex items-center space-x-2"
                    >
                      <RadioGroupItem
                        value={hiringType.value}
                        id={hiringType.value}
                      />
                      <Label htmlFor={hiringType.value}>
                        {hiringType.label}
                      </Label>
                    </div>
                  ))}
                </RadioGroup>
              ),
            },
            {
              id: "meetingMethod",
              label: "訪問方法",
              content: (
                <RadioGroup
                  defaultValue={currentParams.meetingMethod}
                  className="flex space-x-4 mt-2"
                  onValueChange={onChangeParamsMethods.onChangeMeetingMethod}
                >
                  {MEETING_METHOD.map((meetingMethod) => (
                    <div
                      key={meetingMethod.id}
                      className="flex items-center space-x-2"
                    >
                      <RadioGroupItem
                        value={meetingMethod.value}
                        id={`meetingMethod-${meetingMethod.value}`}
                      />
                      <Label htmlFor={`meetingMethod-${meetingMethod.value}`}>
                        {meetingMethod.label}
                      </Label>
                    </div>
                  ))}
                </RadioGroup>
              ),
            },
          ].map(({ id, label, content }) => (
            <div key={id} className="pb-4">
              <Label htmlFor={id} className="text-lg font-semibold block mb-2">
                {label}
                <span className="text-sm font-normal ml-1">から選ぶ</span>
              </Label>
              <div className="pt-2 border-t border-gray-200">{content}</div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}