import React from 'react';
import styled from 'styled-components';
import { Link } from 'gatsby';

const PostList = ({ posts }) => {
  const PostList = posts.map(({ frontmatter, fields, excerpt, timeToRead }) => {
    const { path, title, date, description } = frontmatter;
    const { slug } = fields;

    return (
      <PostListItem
        key={path}
        path={path}
        title={title}
        date={date}
        slug={slug}
        description={description}
        excerpt={excerpt}
      />
    );
  });

  return <StyledPostList>{PostList}</StyledPostList>;
};

export default PostList;

const PostListItem = ({
  title,
  path,
  date,
  excerpt,
  description,
  slug,
}) => {
  return (
    <StyledPostListItem>
      {/*}<Tags tags={tags} />*/}

      <PostListTitle>
        <Link to={path}>{title}</Link>
      </PostListTitle>
      <PostListExcerpt
        dangerouslySetInnerHTML={{
          __html: description || excerpt,
        }}
      />
      <PostListMeta>
        <span>{date}</span>

        {/*<span>{timeToRead} mins</span>*/}
      </PostListMeta>
    </StyledPostListItem>
  );
};

const StyledPostList = styled.ul`

  list-style: none;
  display: grid;
  padding: 0;
  justify-items: center;
  grid-gap: var(--size-600);
  grid-template-columns: repeat(auto-fit, minmax(23ch, 1fr));
  margin: calc(var(--spacing) * 1) 0;
  @media screen and (max-width: 500px) {
    & {
      display: block;
    }
  }

`;

const StyledPostListItem = styled.li`
  position: relative;
  display: flex;
  flex-direction: column;
  padding: 1rem;
  border: 1px solid rgba(var(--primaryRGB), 0.5);
  background: linear-gradient(135deg, rgba(255,255,255,.6) 0%, rgba(var(--secondaryRGB), 0.4) 200%);
  backdrop-filter: blur(20px);
  border-radius: 8px;

  margin: 0;

  &:hover {
    background-color: rgba(255, 255, 255, 0.5);
  }

  @media screen and (max-width: 500px) {
    & {
      margin-top: var(--size-600);
    }
  }
`;

const PostListTitle = styled.h2`
  line-height: 1.28;
  margin-top: 0rem;
  margin-bottom: .5rem;
  text-transform: capitalize;
  font-size: var(--size-600);
  font-weight: 600;

  & a {
    text-decoration: none;
    color: inherit;
  }

  & a::after {
    content: '';
    position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
  }
`;

const PostListExcerpt = styled.p`
  // margin-top: auto;
  font-size: var(--size-350);
`;

const PostListMeta = styled.div`
  margin-top: auto;
  font-style: italic;
  font-size: var(--size-300);
  display: flex;
  justify-content: space-between;
`;
