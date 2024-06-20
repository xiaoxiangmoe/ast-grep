use crate::{Doc, Node};

#[derive(Clone)]
pub enum MatchStrictness {
  Cst,       // all nodes are matched
  Smart,     // all nodes except source trivial nodes are matched.
  Ast,       // only ast nodes are matched
  Lenient,   // ast-nodes excluding comments are matched
  Signature, // ast-nodes excluding comments, without text
}

pub(crate) enum MatchOneNode {
  MatchedBoth,
  SkipBoth,
  SkipGoal,
  SkipCandidate,
  NoMatch,
}

impl MatchStrictness {
  pub(crate) fn match_terminal<D: Doc>(
    &self,
    is_named: bool,
    text: &str,
    kind: u16,
    candidate: &Node<D>,
  ) -> MatchOneNode {
    use MatchStrictness as M;
    let k = candidate.kind_id();
    if k == kind && text == candidate.text() {
      return MatchOneNode::MatchedBoth;
    }
    let (skip_goal, skip_candidate) = match self {
      M::Cst => (false, false),
      M::Smart => (false, !candidate.is_named()),
      M::Ast => (!is_named, !candidate.is_named()),
      M::Lenient => (
        !is_named,
        !candidate.is_named() || candidate.is_comment_like(),
      ),
      M::Signature => {
        if k == kind {
          return MatchOneNode::MatchedBoth;
        }
        (
          !is_named,
          !candidate.is_named() || candidate.is_comment_like(),
        )
      }
    };
    match (skip_goal, skip_candidate) {
      (true, true) => MatchOneNode::SkipBoth,
      (true, false) => MatchOneNode::SkipGoal,
      (false, true) => MatchOneNode::SkipCandidate,
      (false, false) => MatchOneNode::NoMatch,
    }
  }
  pub fn should_skip_matching_node<D: Doc>(&self, node: &Node<D>) -> bool {
    use MatchStrictness::*;
    match self {
      Cst => false,
      Smart => !node.is_named(),
      Ast => !node.is_named(),
      Lenient => !node.is_named() || node.is_comment_like(),
      Signature => !node.is_named() || node.is_comment_like(),
    }
  }
  pub fn should_keep_in_pattern<D: Doc>(&self, node: &Node<D>) -> bool {
    use MatchStrictness::*;
    match self {
      Cst => true,
      Smart => true,
      Ast => node.is_named(),
      Lenient => node.is_named() && !node.is_comment_like(),
      Signature => node.is_named() && !node.is_comment_like(),
    }
  }
}