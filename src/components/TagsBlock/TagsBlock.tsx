import React, { useLayoutEffect, useState } from 'react';

import SectionTitle from '../common/SectionTitle';
import Tag from '../Tag/Tag';

type Props = {
    title: string;
    subtitle: string;
    fetchFunction: (a?: number) => Promise<{ name: string }[] | string[]>;
    lazy?: boolean;
};

const LIMIT_TAGS = 12;

const TagsBlock: React.FC<Props> = ({ title, subtitle, fetchFunction, lazy }) => {
    const [tags, setTags] = useState<string[]>([]);
    const [expanded, setExpanded] = useState(false);

    const getAndSetTags = async (fullList?: boolean) => {
        try {
            const tags = await fetchFunction(lazy && !fullList ? LIMIT_TAGS : undefined);
            setTags(tags.map((item) => (typeof item === 'string' ? item : item.name)));
        } catch (e) {
            console.error(e);
        }
    };

    const handleExpanded = () => {
        setExpanded(true);
        lazy && setTimeout(() => getAndSetTags(true), 100);
    };

    useLayoutEffect(() => {
        getAndSetTags();
    }, []);

    return (
        <div className="flex xs:flex-row flex-col mt-10">
            <div className="basis-1/4">
                <SectionTitle className="text-xl">{title}</SectionTitle>
                <span className="text-neutral-500 text-xs">{subtitle}</span>
            </div>
            <div className="basis-3/4">
                {tags.slice(0, expanded ? undefined : LIMIT_TAGS).map((tag, idx) => (
                    <Tag key={idx}>{tag}</Tag>
                ))}
                {!expanded ? <Tag expand={handleExpanded} expander={true} /> : null}
            </div>
        </div>
    );
};

export default TagsBlock;
